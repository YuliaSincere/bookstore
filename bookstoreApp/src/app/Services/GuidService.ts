import { Guid } from 'guid-typescript';

export class GuidService {
    
    public static toGuid(guidAsString: string): Guid | null {
        
        if (!guidAsString) {
            return null;
        }

        let guidString = guidAsString
        .toUpperCase()
        .replace("{", "")
        .replace("}", "");

        if (Guid.isGuid(guidString)) {
            return Guid.parse(guidString);
        }

        return null;
    }
}
