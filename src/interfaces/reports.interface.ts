
export interface ReportingData {
    id : number,
    answer : string,
    organizationId : number,
    question : string
}

interface QuestionAnswer {
    [key:string] : string
}
export interface Report {
    createdOn : string,
    organizationId : number,
    organizationName : string,
    primaryContact : string,
    reportingData: ReportingData[],
    questionAnswer: QuestionAnswer,
    taxId : number,
    [key:string]: any
}