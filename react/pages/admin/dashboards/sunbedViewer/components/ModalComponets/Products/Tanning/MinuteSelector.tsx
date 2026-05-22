import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import { useAddQueue } from "../../Context";

const tanningMinutes = [3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18, 20];

export const MinuteSelector = () => {
    const [selectedMinutes, setSelectedMinutes] = useState(0);
    const { isDarkMode } = useTheme();
    const {addMinutesToCart} = useAddQueue();

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value, 10);

        if (!isNaN(value) && value >= 0) {
            setSelectedMinutes(value);
        } else if (event.target.value === "") {
            setSelectedMinutes(0);
        }
    }

    function handleAddToCart() {
    if (selectedMinutes <= 0) {
        return; 
    }

    const MinPrice = 1.1; 

    const newMinutesItem = {
        value: selectedMinutes,
        price: MinPrice * selectedMinutes,
    };

    addMinutesToCart(newMinutesItem);

    setSelectedMinutes(0);
}

    return (
        <div>
            <div className="grid grid-cols-4 gap-2 mt-6">
                {tanningMinutes.map((minutes) => (
                    <button
                        key={minutes}
                        className={`btn btn-soft btn-neutral`}
                        onClick={() => setSelectedMinutes(minutes)}
                    >
                        {minutes} mins
                    </button>
                ))}
            </div>

            <div className="flex flex-col mt-6 w-1/3">
                <div className="flex items-end gap-30">
                    <input
                        type="number"
                        // The input's value is now controlled by the selectedMinutes state
                        value={selectedMinutes}
                        onChange={handleInputChange}
                        className="input input-bordered w-18 h-18 text-center text-2xl"
                        min="0"
                        max="90"
                    />
                    <button className={`btn btn-success ${isDarkMode && 'btn-soft'} flex-grow`} onClick={() => handleAddToCart()}>Add to Cart</button>

                </div>
            </div>


        </div>
    );
};
