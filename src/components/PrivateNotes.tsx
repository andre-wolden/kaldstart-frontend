import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";

interface PrivateNote {
    id: string;
    note: string;
}

const isPrivateNotesResponse = (input: any): input is AxiosResponse<PrivateNote[]> => !!(input && input.data && Array.isArray(input.data))


/**
 *
 * just a crazy awesome comment
 */

export const PrivateNotes = () => {
    const [privateNotesResponse, setPrivateNotesResponse] = useState<AxiosResponse<PrivateNote[]> | undefined | any>(undefined);

    const getPrivateNotes = async () => {
        axios
            .get('http://127.0.0.1:7008/api/private-notes/all')
            .then((privateNotesResponse: AxiosResponse<PrivateNote[]>) => {setPrivateNotesResponse(privateNotesResponse)})
            .catch(setPrivateNotesResponse)
    }

    useEffect(() => {
        if (privateNotesResponse === undefined) {
            getPrivateNotes();
        }
    }, [privateNotesResponse])

    if (isPrivateNotesResponse(privateNotesResponse)) {
        return (
            <div>
                <span>These are your notes:</span>
                <ul>
                    {privateNotesResponse.data.map(note =>
                        (<li>{note.note}</li>))}
                </ul>
            </div>
        );
    }

    return (
        <div>
            Cant show any notes. Response from server:
            {JSON.stringify(privateNotesResponse, null, 4)}
        </div>
    );
}
