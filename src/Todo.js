import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
    const navigate = useNavigate();

    const [todoData, setTodoData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('LeadNo');
    const [searchValue, setSearchValue] = useState('');
    const [startDate, setStartDate] = useState('2023-12-09'); 
    const [endDate, setEndDate] = useState('2024-12-07');
    const [statusType, setStatusType] = useState('All');
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestBody = new URLSearchParams({
                    URL: 'https://dollarsoftware.in/CrmWebService.asmx',
                    SoapBody: `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <GetJsonLeadData xmlns="http://dollarsoftware.in">
          <Sdate>2023-12-09</Sdate>
          <Edate>2024-12-07</Edate>
        </GetJsonLeadData>
      </soap:Body>
    </soap:Envelope>`,
                    SoapAction: 'http://dollarsoftware.in/GetJsonLeadData'
                });

                const response = await fetch('/SoapAPI.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: requestBody.toString()
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.text();
                const parsedData = JSON.parse(data);
                setTodoData(parsedData);
                setFilteredData(parsedData); 
                setLoading(false);
            } catch (error) {
                console.error('Error occurred:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [startDate, endDate]);

    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value);
    };

    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatusType(e.target.value);
    };

    const handleSearch = () => {
        let updatedFilteredData = [...todoData];

        // Apply search filter
        if (searchValue.trim() !== '') {
            updatedFilteredData = updatedFilteredData.filter(item =>
                item[selectedFilter].toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        // Apply status filter
        if (statusType !== 'All') {
            updatedFilteredData = updatedFilteredData.filter(item =>
                item.StatusType === statusType
            );
        }

        // Apply date range filter
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        updatedFilteredData = updatedFilteredData.filter(item => {
            const leadDate = new Date(item.LeadDated);
            return leadDate >= startDateObj && leadDate <= endDateObj;
        });

        // Update filtered data state and show results
        setFilteredData(updatedFilteredData);
        setShowResults(true);

        // Navigate to search results page with filteredData
        navigate('/search-results', { state: { filteredData: updatedFilteredData } });
    };


    const handleResetFilters = () => {
        setFilteredData(todoData); 
        setSearchValue('');
        setStartDate('2023-12-09'); // Reset to initial start date
        setEndDate('2024-12-07'); // Reset to initial end date
        setStatusType('All'); // Reset status type
        setShowResults(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='Container'>
            <div className='MainFilter'>
                <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={handleStartDateChange}
                />
                <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    onChange={handleEndDateChange}
                />
                <select value={statusType} onChange={handleStatusChange}>
                    <option value="All">All</option>
                    <option value="Followup">Followup</option>
                    <option value="Close">Close</option>
                    <option value="Convert2Enquiry">Convert2Enquiry</option>
                </select>
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleResetFilters}>Reset</button>
            </div>
        </div>
    );
};

export default Todo;

