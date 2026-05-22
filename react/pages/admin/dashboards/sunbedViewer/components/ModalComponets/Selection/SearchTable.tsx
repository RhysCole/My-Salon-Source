import { useSelector } from "react-redux";
import { SearchTableRow } from "./SearchTableRow";
import type { RootState } from "@/contexts/store";
import { useMemo, useRef, useState } from "react";
import { filteredResults } from "@/utils/searchFunctions";
import { Pagination } from "./Padington";

import { useAddQueue } from "../Context";

const columns = ['Name', 'Date of Birth', 'Phone Number', 'E-Mail'];

export function SearchTable() {
    const customers = useSelector((state: RootState) => state.customers.customers);
    const customerCount = customers.length;

    const { setSelectedCustomer, setTransitionCondition } = useAddQueue();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const searchParam = useRef<HTMLSelectElement>(null);

    const filteredCustomers = useMemo(() => {
        return filteredResults(customers, searchQuery, searchParam.current?.value)
    }, [customers, searchQuery])

    const paginatedCustomers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredCustomers.slice(startIndex, endIndex);
    }, [filteredCustomers, currentPage]);

    return (<div className="card bg-base-100  shadow">
        <div className="card-body p-0">
            <div className="flex items-center justify-between px-5 pt-5">
                <div className="inline-flex items-center gap-92">
                    <label className="input input-sm">
                        <span className="iconify lucide--search text-base-content/80 size-3.5" />
                        <input
                            type="search"
                            className="w-24 xl:w-60"
                            placeholder="Search for customer"
                            aria-label="Search orders"
                            value={searchQuery}
                            onChange={(event) => { setSearchQuery(event.target.value) }}
                        />
                    </label>
                    <div className="hidden sm:block">
                        <select className="select select-sm w-36" defaultValue="name" aria-label="Category" ref={searchParam}>
                            <option value="" disabled>
                                Search By
                            </option>
                            {columns.map((item, index) => {
                                return (
                                    <option key={index}>{item}</option>)
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className="mt-4 overflow-auto">
                <table className="table">
                    <thead>
                        <tr>
                            {columns.map((item, index) => {
                                return (
                                    <th key={index}>{item}</th>)
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedCustomers.map((customer, index) => {
                            return (<SearchTableRow
                                name={`${customer.first_name} ${customer.last_name}`}
                                DOB={customer.date_of_birth}
                                phoneNumber={customer.phone_number}
                                eMail={customer.email}
                                key={index}
                                onClick={() => { setSelectedRow(index); setTransitionCondition(true); setSelectedCustomer(customer) }}
                                selected={selectedRow === index}
                            />)
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-end mt-3 mb-3">
                <Pagination currentPage={currentPage} totalItems={customerCount} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
            </div>
        </div>
    </div>);
} 