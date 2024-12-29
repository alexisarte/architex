
type Professional = {
    fullName: string;
    provincialRegistration: string;
    municipalRegistration: string;
    dni?: string;
    location?: string;
};

export class CreateProjectDto {
    name: string;
    expedient: string;
    type: string;
    destination: string;
    location: string;
    scale: string;
    requirements?: string;
    references?: string;
    antecedent?: string;
    approval: string;
    planners: Professional[];
    contractors: Professional[];
    organization: string;
}
