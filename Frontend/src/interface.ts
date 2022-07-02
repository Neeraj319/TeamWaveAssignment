export interface NormalSearchProps {
    page ?: number;
    todate ?: number;
    max ?: number;
    min ?: number;
    sort : string;
    nottagged ?: string;
    tagged : string;
    pageSize ?: number;
    order : string;
    intitle ?: string;
    formdate ?: number;
}