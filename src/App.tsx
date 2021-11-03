import React, {useEffect, useState} from 'react';
import './App.css';
import axios, {AxiosResponse} from "axios";

interface PrivateNote {
    id: string;
    note: string;
}

const isPrivateNotesResponse = (input: any): input is AxiosResponse<PrivateNote[]> => !!(input && input.data && Array.isArray(input.data))

const App = () => {

    const [privateNotesResponse, setPrivateNotesResponse] = useState<AxiosResponse<PrivateNote[]> | undefined | any>(undefined);

    const getPrivateNotes = async () => {
        axios
            .get('http://127.0.0.1:7008/api/private-notes/all')
            .then((privateNotesResponse: AxiosResponse<PrivateNote[]>) => {setPrivateNotesResponse(privateNotesResponse)})
    }

    useEffect(() => {
        if (privateNotesResponse === undefined) {
            getPrivateNotes();
        }
    }, [])

    if (isPrivateNotesResponse(privateNotesResponse)) {
        return (
            <div>
                These are your notes:
                {JSON.stringify(privateNotesResponse.data)}
            </div>
        );
    }

    return (
        <div>
            Cant show any notes. Response from server:
            {JSON.stringify(privateNotesResponse, null, 4)}
        </div>
    );
};

export default App;
