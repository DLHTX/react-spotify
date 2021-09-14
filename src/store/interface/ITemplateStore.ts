export interface ITemplateStore {
    template: string,

    changeTemplateName(v: string): void

    totalName(): any

    asyncChange(): any
}