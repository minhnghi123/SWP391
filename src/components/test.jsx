import { useState } from "react";

export default function Test() {
    const [api, setApi] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [inputDat, setData] = useState([{
        id:"",
        name: "",
        datOfBrith: "",
        dateInject: "",
        gender: "",
        advistory: ""
    }])
    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setData(prevInput => ({ ...prevInput, [name]: value }));
    }
    const hadleSubmit = (e) => {
        e.preventDefault();
        setApi(prevInput => [...prevInput, inputDat])
        console.log(inputDat)

    }
    return <div>
        <h1>Form infomation</h1>
        <form className="flex flex-col gap-4" onSubmit={hadleSubmit}>
            <input className="" type="text" placeholder="Enter your name" name="name" onChange={handleOnchange} />
            <input type="date" name="datOfBrith" onChange={handleOnchange} />
            <input type="date" name="dateInject" onChange={handleOnchange} />
            <div className="flex flex-col ">
                <h1>Gender</h1>
                <div>
                    <input type="radio" name="gender" value="Male" onChange={handleOnchange} />
                    <label htmlFor="Male">Male</label>
                </div>
                <div>
                    <input type="radio" name="gender" value="Female" onChange={handleOnchange} />
                    <label htmlFor="Female">Female</label>
                </div>
                <div>
                    <input type="radio" name="gender" value="Other" onChange={handleOnchange} />
                    <label htmlFor="Other">Other</label>
                </div>

                <div>
                    <div >
                        <div onClick={() => setIsOpen(!isOpen)}>
                            yes
                        </div>
                        <div onClick={() => setIsOpen(!isOpen)}>
                            no
                        </div>
                    </div>
                </div>

                {
                    isOpen && (
                        <div>
                            <textarea onChange={handleOnchange} name="advistory" />
                        </div>)
                }

            </div>


            <button type="submit">Save information</button>
        </form>
    </div>
}