import { Link } from "react-router";

export const Footer = () => {
    return (
        <div className="-mt-2 flex items-center justify-between px-6 pb-4">
            <p>
                Developed by{" "}
                <Link to="https://www.thebeach-tanning.com/tanning-salon-epsom/" target="_blank" className="text-primary">
                    Rhys Cole
                </Link>
            </p>
        </div>
    );
};
