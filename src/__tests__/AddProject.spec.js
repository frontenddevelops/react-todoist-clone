import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AddProject } from '../components/AddProject';

beforeEach(cleanup);

jest.mock('../context', () => ({
    useSelectedProjectValue: jest.fn(),
    useProjectsValue: jest.fn(() => ({
        projects: [
            {
                name: "WOW",
                projectId: "-M1fV-4X------------",
                userId: "1"
            },
            {
                name: "FUTURE",
                projectId: "2",
                userId: "1"
            },
            {
                name: "DAILY",
                projectId: "3",
                userId: "1"
            },
            {
                name: "MUSIC",
                projectId: "1",
                userId: "1"
            },
        ],
        setProjects: jest.fn()
    }))
}));

jest.mock('../firebase', () => ({
    firebase: {
        firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                add: jest.fn(() => Promise.resolve('I am resolved')),
            })),
        })),
    }
}));


describe("<AddProject />", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders <AddProject />', () => {
        const {queryByTestId} = render(<AddProject shouldShow/>);
        expect(queryByTestId('add-project')).toBeTruthy;
    });

    it('renders <AddProject /> and add a project', () => {
        const {queryByTestId, getByText} = render(<AddProject shouldShow/>);
        expect(queryByTestId('add-project')).toBeTruthy();

        fireEvent.change(queryByTestId('project-name'), {
            target: {value: 'Best project ever!'}
        });
        expect(queryByTestId('project-name').value).toBe('Best project ever!');

        fireEvent.click(queryByTestId('add-project-submit'));
    });

    it('renders <AddProject /> and cancel adding a project by onClick', () => {
        const {queryByTestId, getByText} = render(<AddProject shouldShow/>);
        expect(queryByTestId('add-project')).toBeTruthy();
        expect(queryByTestId('add-project-inner')).toBeTruthy();
        fireEvent.click(getByText('Cancel'));
        expect(queryByTestId('add-project')).toBeTruthy();
        expect(queryByTestId('add-project-inner')).toBeFalsy();
    });

    it('renders <AddProject /> and cancel adding a project by onKeyDown', () => {
        const {queryByTestId, getByText} = render(<AddProject shouldShow/>);
        expect(queryByTestId('add-project')).toBeTruthy();
        expect(queryByTestId('add-project-inner')).toBeTruthy();
        fireEvent.keyDown(getByText('Cancel'));
        expect(queryByTestId('add-project')).toBeTruthy();
        expect(queryByTestId('add-project-inner')).toBeFalsy();
    });

    it('hides the project overlay using onClick singular and reverse action', () => {
        const {queryByTestId} = render(<AddProject shouldShow/>);
        expect(queryByTestId('add-project')).toBeTruthy();
        expect(queryByTestId('add-project-inner')).toBeTruthy();

        fireEvent.click(queryByTestId('add-project-action'));
        expect(queryByTestId('add-project')).toBeTruthy();
        expect(queryByTestId('add-project-inner')).toBeFalsy();
    });
    it('hides the project overlay using onKeyDown singular and reverse action', () => {
        const {queryByTestId} = render(<AddProject shouldShow/>);
        expect(queryByTestId('add-project')).toBeTruthy();
        expect(queryByTestId('add-project-inner')).toBeTruthy();

        fireEvent.keyDown(queryByTestId('add-project-action'));
        expect(queryByTestId('add-project')).toBeTruthy();
        expect(queryByTestId('add-project-inner')).toBeFalsy();
    });

});
