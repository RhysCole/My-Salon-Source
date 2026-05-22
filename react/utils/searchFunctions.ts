import type { ICustomer } from "@/Models/types";

export function filteredResults(customers: ICustomer[], query: string, searchParam: string){
    const searchTerms = query.toLowerCase().split(' ').filter(term => term);

    if(searchTerms.length === 0){
        return customers;
    }

    switch (searchParam.toLowerCase()){
        case 'name':
            return customers.filter(customer => {
                const fullName = `${customer.first_name} ${customer.last_name}`.toLowerCase();
                return searchTerms.every(term => fullName.includes(term));
            })
        default:
            throw new Error('search parameter is invalid')
    }
}   