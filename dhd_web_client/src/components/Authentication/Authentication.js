import React, { useState } from 'react';
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
} from 'mdb-react-ui-kit';
import SignIn from "~/components/Authentication/SignIn/SignIn";
import Register from "~/components/Authentication/Register/Register";


function Authentication () {
    const [justifyActive, setJustifyActive] = useState('tab1');

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                        Login
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                        Register
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
                <SignIn />

                <Register />
            </MDBTabsContent>
        </MDBContainer>
    );
}

export default Authentication;