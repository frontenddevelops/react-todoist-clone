import React from 'react';
import { render, cleanup, fireEvent } from "@testing-library/react";
import { IndividualProject } from "../components/IndividualProject";

beforeEach(cleanup);

jest.mock('../firebase', () => ({
    firebase: {
        firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                doc: jest.fn(() => ({
                    delete: jest.fn(() => Promise.resolve('Never mock firebase, but I did')),
                    update: jest.fn(),
                })),
            })),
        })),
    },
}));

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


describe('<IndividualProject />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const project = {
        name: 'MUSIC',
        projectId: '1',
        userId: '1',
        docId: '1',
    };

    describe('Success', () => {
        it('renders the project', () => {
            const {getByText} = render(<IndividualProject project={project}/>);
            expect(getByText('MUSIC')).toBeTruthy();
        });

        it('renders the project and then the delete overlay and then deletes a project using onClick', () => {
            const {queryByTestId, getByText} = render(<IndividualProject project={project}/>);
            expect(getByText('MUSIC')).toBeTruthy();

            fireEvent.click(queryByTestId('delete-project'));
            expect(getByText('Are you sure you want to delete this project?')).toBeTruthy();

            fireEvent.click(getByText('Delete'));
        });

        it('renders the project and then the delete overlay and then deletes a project using onKeyDown', () => {
            const {queryByTestId, getByText} = render(<IndividualProject project={project}/>);
            expect(getByText('MUSIC')).toBeTruthy();

            fireEvent.keyDown(queryByTestId('delete-project'));
            expect(getByText('Are you sure you want to delete this project?')).toBeTruthy();

            fireEvent.click(getByText('Delete'));
        });

        it('renders the project and then the delete overlay and then cancels a project using onClick', () => {
            const {queryByTestId, getByText} = render(<IndividualProject project={project}/>);
            expect(getByText('MUSIC')).toBeTruthy();

            fireEvent.click(queryByTestId('delete-project'));
            expect(getByText('Are you sure you want to delete this project?')).toBeTruthy();

            fireEvent.click(getByText('Cancel'));
        });
        it('renders the project and then the delete overlay and then cancels a project using onKeyDown', () => {
            const {queryByTestId, getByText} = render(<IndividualProject project={project}/>);

            fireEvent.keyDown(queryByTestId('delete-project'));
            expect(getByText('Are you sure you want to delete this project?')).toBeTruthy();

            fireEvent.keyDown(getByText('Cancel'));
        });


    });

});
