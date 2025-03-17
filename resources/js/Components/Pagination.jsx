import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    console.log(links);
    return (
        <nav className="flex items-center justify-center mt-4">
           {
            links.map((link) => (
                <Link 
                    preserveScroll
                    key={link.label}
                    href={link.url}
                    className={
                        "inline-block py-2 px-3 rounded-md text-gray-500 text-sm " 
                        + (link.active ? " bg-gray-500 text-white" : "") 
                        + (!link.url ? " opacity-50 cursor-not-allowed" : " hover:bg-gray-500 hover:text-white")
                    }
                    dangerouslySetInnerHTML={{ __html: link.label }} />
           ))}
        </nav>
    )
}