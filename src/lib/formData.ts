export const getEntries = <T extends Record<string, any>>(
    formData: FormData
  ) => {
    const requiredProperties: (keyof T)[] = Object.keys({} as T).filter(
      (key) => 
        !({} as T)[key] === null ||
        !({} as T)[key] === undefined ||
        typeof ({} as T)[key] === "string"
    );
  
    const obj: any = {};
    for (const [key, value] of formData.entries()) {
      obj[key] = value;
    }
  
    requiredProperties.forEach((prop) => {
        console.log("prop value", prop, obj[prop]);
        if (
            !(prop in obj) ||
            obj[prop] === '' ||
            obj[prop] === null ||
            obj[prop] === undefined ||
            (typeof obj[prop] === "string" && obj[prop].trim() === "")
        ) {
            throw new Error(`Missing or invalid required property: ${String(prop)}`);
        }
    });
  
    return obj as T;
  };
  