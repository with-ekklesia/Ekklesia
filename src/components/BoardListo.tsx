import React, { useState } from 'react';
import { actions, getActionProps } from "astro:actions";
import type { SelectBoard } from '@db/types';

export default function BoardTable() {
  const [boards, setBoards] = useState(Array<SelectBoard>); // assume boards is an array of objects
  const [newRow, setNewRow] = useState(false);
  const [newId, setNewId] = useState<number>(0);
  const [newName, setNewName] = useState('');
  const [newIsActive, setNewIsActive] = useState<boolean | null>(false);

  const handleAddRow = () => {
    setNewRow(true);
  };

  const handleSubmission = async (e: Event) => {
    e.preventDefault();
    // Dispatch an action to add a new row
    const data = await actions.boards({ name: newName, isActive: newIsActive ?? true });
    console.log("handling submission");
    setNewRow(false);
    setNewId(data.board[0].id);
    setNewName(data.board[0].name);
    setNewIsActive(data.board[0].isActive);
  };

  return (
    <div
      className="not-prose relative overflow-hidden rounded-xl bg-[color:var(--ek-lightGreen)]"
    >
      <div
        className="bg-grid-slate-100 absolute inset-0"
      />
      <div className="relative overflow-auto rounded-xl">
        <div className="my-8 overflow-hidden shadow-sm">
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-b p-4 pb-3 pl-8 pt-0 text-left font-medium text-[color:var(--ek-black)]">
                  Id
                </th>
                <th className="border-b p-4 pb-3 pt-0 text-left font-medium text-[color:var(--ek-black)]">
                  Name
                </th>
                <th className="border-b p-4 pb-3 pr-8 pt-0 text-left font-medium text-[color:var(--ek-black)]">
                  IsActive
                </th>
                <th className="border-b p-4 pb-3 pr-8 pt-0 text-left font-medium text-[color:var(--ek-black)]">
                  <button onClick={handleAddRow}>
                    <span className="material-icons">add</span>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
              {boards.map((board, index) => (
                <tr key={index}>
                  <td className="border-b border-slate-100 p-4 pl-8 text-[color:var(--ek-black)]">
                    {board.id}
                  </td>
                  <td className="border-b border-slate-100 p-4 text-[color:var(--ek-black)]">
                    {board.name}
                  </td>
                  <td className="border-b border-slate-100 p-4 pr-8 text-[color:var(--ek-black)]">
                    {board.isActive ? "Active" : "Inactive"}
                  </td>
                </tr>
              ))}
              {newRow && (
                <tr>
                  <td className="border-b border-slate-100 p-4 pl-8 text-[color:var(--ek-black)]">
                    <input
                      type="number"
                      value={newId}
                      onChange={(e) => setNewId(Number(e.target.value))}
                    />
                  </td>
                  <td className="border-b border-slate-100 p-4 text-[color:var(--ek-black)]">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </td>
                  <td className="border-b border-slate-100 p-4 pr-8 text-[color:var(--ek-black)]">
                    <input
                      type="checkbox"
                      checked={newIsActive ?? true}
                      onChange={(e) => setNewIsActive(e.target.checked)}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {newRow && (
            <button onClick={() => handleSubmission}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
}