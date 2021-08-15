import produce from 'immer';
import createReducers from './reducerUtils';

const initialState = {
    users: [
        {
            id: "315437624",
            name: "Elisheva Shtainharter",
            extraordinaryHours: "4",
            manualHours: "4",
            hours: "155",
            totalHours: "159",
            options: "*"
        },
        {
            id: "32222222",
            name: "Tamar Cohen",
            extraordinaryHours: "4",
            manualHours: "4",
            hours: "155",
            totalHours: "159",
            options: "*"
        },
        {
            id: "31111111",
            name: "Shira Levi",
            extraordinaryHours: "4",
            manualHours: "4",
            hours: "155",
            totalHours: "159",
            options: "*"
        },
        {
            id: "33333333",
            name: "Shiel Buda",
            extraordinaryHours: "4",
            manualHours: "4",
            hours: "155",
            totalHours: "159",
            options: "*"
        },
        {
            id: "325896321",
            name: "Yael Katz",
            extraordinaryHours: "4",
            manualHours: "4",
            hours: "155",
            totalHours: "159",
            options: "*"
        },
        {
            id: "325896478",
            name: "Sevi Samin",
            extraordinaryHours: "4",
            manualHours: "4",
            hours: "155",
            totalHours: "159",
            options: "*"
        },
        {
            id: "328895475",
            name: "Sara Levi",
            extraordinaryHours: "4",
            manualHours: "4",
            hours: "155",
            totalHours: "159",
            options: "*"
        },
        {
            id: "320587410",
            name: "Efrat Cohen",
            extraordinaryHours: "4",
            manualHours: "4",
            hours: "155",
            totalHours: "159",
            options: "*"
        },
        {
            id: "320589457",
            name: "Yael Bar",
            extraordinaryHours: "4",
            manualHours: "4",
            hours: "155",
            totalHours: "159",
            options: "*"
        }
    ]
}

const Users = {   
    setUsers(state, action) {
        debugger
        state.users = action.payload;
    }
};

export default produce((state, action) => createReducers(state, action, Users), initialState)



