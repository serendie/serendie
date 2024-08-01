/**
 * Do not edit directly
 * Generated on Thu, 01 Aug 2024 21:54:29 GMT
 */


export default tokens;

type value = string | number | Record<string, string | number>;

interface Token {
    path: string[];
    key: string;
    type: string;
    value: value;
    originalValue: value;
}

declare const tokens: Token[];
