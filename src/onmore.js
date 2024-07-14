
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const { filteredData } = location.state;

    // State variables for filters
    const [selectedFilter, setSelectedFilter] = useState('LeadNo');
    const [searchValue, setSearchValue] = useState('');

    // Event handler for filter change
    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value);
    };

    // Event handler for search input change
    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    // Filtering logic based on selected filter and search value
    const filteredResults = filteredData.filter((item) => {
        // Convert searchValue to lower case for case-insensitive comparison
        const searchValueLower = searchValue.toLowerCase();

        // Ensure item[field] is a string and handle case-insensitive search
        const fieldValue = String(item[selectedFilter]).toLowerCase(); // Convert to string to avoid non-string errors

        // Check for exact match
        return fieldValue === searchValueLower;
    });

    return (
        <div className='Container'>
            <div className='Dropdown'>
                <select value={selectedFilter} onChange={handleFilterChange}>
                    <option value="LeadNo">Lead No</option>
                    <option value="LeadDated">Lead Date</option>
                    <option value="Organization">Organization</option>
                    <option value="ContactPersonName">Contact Person</option>
                    <option value="MobNo">Mobile No</option>
                    <option value="TradeTypeName">Trade Type</option>
                    <option value="Adrees">Address</option>
                    <option value="CityName">City</option>
                    <option value="AreaName">Area</option>
                    <option value="SourceName">Source</option>
                    <option value="Prod1Name">Product</option>
                    <option value="Prod2Name">Product</option>
                    <option value="Prod3Name">Product</option>
                    <option value="Prod4Name">Product</option>
                    <option value="Prod5Name">Product</option>
                    <option value="StatusType">Status</option>
                    <option value="FollowupDated">Followup Date</option>
                    <option value="Remark">Remark</option>
                    <option value="AllocatedTo">Allocated To</option>
                </select>
            </div>

            <div className='TextBox'>
                <input
                    type="text"
                    id="search-value"
                    placeholder="Enter a value"
                    value={searchValue}
                    onChange={handleSearchInputChange}
                />
            </div>

            <div className='Leads'>
                <h1>Leads</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Lead No</th>
                            <th>Lead Date</th>
                            <th>Organization</th>
                            <th>Contact Person</th>
                            <th>Mobile No</th>
                            <th>Trade Type</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Area</th>
                            <th>Source</th>
                            <th>Product 1</th>
                            <th>Product 2</th>
                            <th>Product 3</th>
                            <th>Product 4</th>
                            <th>Product 5</th>
                            <th>Status</th>
                            <th>Followup Date</th>
                            <th>Remark</th>
                            <th>Allocated To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResults.map((item, index) => (
                            <tr key={index}>
                                <td>{item.LeadNo}</td>
                                <td>{item.LeadDated}</td>
                                <td>{item.Organization}</td>
                                <td>{item.ContactPersonName}</td>
                                <td>{item.MobNo}</td>
                                <td>{item.TradeTypeName}</td>
                                <td>{item.Adrees}</td>
                                <td>{item.CityName}</td>
                                <td>{item.AreaName}</td>
                                <td>{item.SourceName}</td>
                                <td>{item.Prod1Name}</td>
                                <td>{item.Prod2Name}</td>
                                <td>{item.Prod3Name}</td>
                                <td>{item.Prod4Name}</td>
                                <td>{item.Prod5Name}</td>
                                <td>{item.StatusType}</td>
                                <td>{item.FollowupDated}</td>
                                <td>{item.Remark}</td>
                                <td>{item.AllocatedTo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SearchResults;
