import React from 'react';
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Sidebar } from "../components/layout/Sidebar";

beforeEach(cleanup); // clean the DOM

jest.mock('../context', () => ({
    useSelectedProjectValue: jest.fn(() => ({
        setSelectedProject: jest.fn(() => 'INBOX')
    })),
    useProjectsValue: jest.fn(() => ({
        setProjects: jest.fn(),
        projects: [
            {
                name: 'MUSIC',
                projectId: '1',
                userId: '1',
                docId: '1',
            }
        ]
    }))
}));


describe('<Sidebar />', () => {
    describe('Success', () => {
        it('renders the sidebar component', () => {
            const {queryByTestId} = render(<Sidebar/>);
            expect(queryByTestId('sidebar')).toBeTruthy();
        });

        it('changes the active project to Inbox in collated tasks', () => {
            const {queryByTestId} = render(<Sidebar/>);
            expect(queryByTestId('sidebar')).toBeTruthy();

            fireEvent.click(queryByTestId('inbox-action'));

            expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy();
            expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
            expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
        });

        it('changes the active project to Today in collated tasks', () => {
            const {queryByTestId} = render(<Sidebar/>);
            expect(queryByTestId('sidebar')).toBeTruthy();
            fireEvent.click(queryByTestId('today-action'));

            expect(queryByTestId('today').classList.contains('active')).toBeTruthy();
            expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
            expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
        });

        it('changes the active project to Next 7 in collated tasks', () => {
            const {queryByTestId} = render(<Sidebar/>);
            expect(queryByTestId('sidebar')).toBeTruthy();
            fireEvent.click(queryByTestId('next_7-action'));

            expect(queryByTestId('next_7').classList.contains('active')).toBeTruthy();
            expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
            expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
        });


        it('changes the active project to Inbox in collated tasks using onKeyDown', () => {
            const {queryByTestId} = render(<Sidebar/>);
            expect(queryByTestId('sidebar')).toBeTruthy();

            fireEvent.keyDown(queryByTestId('inbox-action'));

            expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy();
            expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
            expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
        });

        it('changes the active project to Today in collated tasks using onKeyDown', () => {
            const {queryByTestId} = render(<Sidebar/>);
            expect(queryByTestId('sidebar')).toBeTruthy();
            fireEvent.keyDown(queryByTestId('today-action'));

            expect(queryByTestId('today').classList.contains('active')).toBeTruthy();
            expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
            expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
        });

        it('changes the active project to Next 7 in collated tasks using onKeyDown', () => {
            const {queryByTestId} = render(<Sidebar/>);
            expect(queryByTestId('sidebar')).toBeTruthy();
            fireEvent.keyDown(queryByTestId('next_7-action'));

            expect(queryByTestId('next_7').classList.contains('active')).toBeTruthy();
            expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
            expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
        });

        it('hides and show sidebar projects using onClick', () => {
            const {queryByTestId, getByText, queryByText} = render(<Sidebar/>);
            expect(queryByTestId('sidebar')).toBeTruthy();

            fireEvent.click(getByText('Projects'));
            expect(queryByText('Add project')).toBeFalsy();

            fireEvent.click(getByText('Projects'));
            expect(queryByText('Add project')).toBeTruthy();
        });

        it('hides and show sidebar projects using onKeyDown', () => {
            const {queryByTestId, getByText, queryByText} = render(<Sidebar/>);
            expect(queryByTestId('sidebar')).toBeTruthy();

            fireEvent.keyDown(getByText('Projects'));
            expect(queryByText('Add project')).toBeFalsy();

            fireEvent.keyDown(getByText('Projects'));
            expect(queryByText('Add project')).toBeTruthy();
        });


    });
});

