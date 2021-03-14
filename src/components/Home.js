import {Button, FormControl, InputLabel, Select} from "@material-ui/core";
import {Link} from "react-router-dom";

const Home = ({onSubmit,options,isLoading,forseUpdate}) => {

    const selectChangeHandler = (object) => {
        onSubmit({...options, [object.name]: object.value})
    }
    const numbers = [
        {value: 10, name: 10},
        {value: 15, name: 15},
        {value: 20, name: 20},
        {value: 25, name: 25},
        {value: 30, name: 30},
    ]
    const difficulties = [
        {value: '', name: 'Any'},
        {value: 'easy', name: 'Easy'},
        {value: 'medium', name: 'Medium'},
        {value: 'hard', name: 'Hard'},
    ]
    const categories = [
        {value: '', name: 'Any'},
        {value: 9, name: 'General Knowledge'},
        {value: 17, name: 'Science & Nature'},
        {value: 18, name: 'Science: Computer'},
        {value: 19, name: 'Science: Mathematics'},
        {value: 21, name: 'Sports'},
        {value: 22, name: 'Geography'},
        {value: 23, name: 'History'},
    ]
    return (
        <div className="container-fluid p-0">
            <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3 p-3">
                <MySelect name={'amount'}
                          className="w-100"
                          label={"Number Of Questions:"}
                          options={options}
                          values={numbers}
                          onChange={selectChangeHandler}/>
                <MySelect name={'difficulty'}
                          className="w-100"
                          values={difficulties}
                          label={"Select Difficulty:"}
                          options={options}
                          onChange={selectChangeHandler}/>
                <MySelect name={'category'}
                          label={"Select Category:"}
                          values={categories}
                          options={options}
                          onChange={selectChangeHandler}/>
                <Button variant="contained"
                        size="large"
                        onClick={forseUpdate}
                        className="bg-success w-100 mt-3 p-0"
                        color="secondary">
                    <Link className="text-white d-block m-0 text-decoration-none w-100 h-100 py-2"
                          to="/quiz"
                          push>
                        {isLoading?'Start':'Continue'}
                    </Link>
                </Button>
            </div>
        </div>
    );
};

const MySelect = ({values = [], onChange, name, label, options}) => {
    return (
        <FormControl variant="standard" fullWidth className="mt-2">
            <InputLabel shrink>{label}</InputLabel>
            <Select
                native
                value={options[name].value}
                onChange={(e) => onChange({name, value: e.target.value})}
                label={label}
            >
                {
                    values.map((value, index) => {
                        return (
                            <option key={index} value={value.value}>{value.name}</option>
                        )
                    })
                }
            </Select>
        </FormControl>
    )
}

export default Home;
