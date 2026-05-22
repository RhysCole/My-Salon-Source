import { useEffect } from "react";

interface props{
    classname: string | null
    setGuest: Function,
}

export function Toggle({classname, setGuest} : props) {
    
    useEffect(() => {
        setGuest(false);
    }, [])

    return (<label className={`toggle text-base-content toggle-xl ${classname}`} >
        <input aria-label="Checkbox" type="checkbox" onChange={() => setGuest(prev => !prev)}/>
        <span
            className="iconify lucide--x m-1 flex size-3.5 items-center"
            aria-label="disabled"
        />
        <span
            className="iconify lucide--check m-1 flex size-3.5 items-center"
            aria-label="enabled"
        />
    </label>)

}