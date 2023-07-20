import fs from "fs/promises";
import { network } from "hardhat";

const vars : { [variableName: string]: string } = { };
function getPath(variableName : string) : string {
    return `./globalvars/${network.name}/${variableName}`;
}

export async function setVar(variableName : string, value : string, retain : boolean = false) : Promise<void> {
    vars[variableName] = value;
    if (retain) {
        await fs.writeFile(getPath(variableName), value, { encoding: "utf-8" });
    }
}

export async function getVar(variableName : string) : Promise<string> {
    if (!vars[variableName]) {
        try {
            vars[variableName] = await fs.readFile(getPath(variableName), { encoding: "utf-8" });
        }
        catch { }
    }
    
    return vars[variableName];
}