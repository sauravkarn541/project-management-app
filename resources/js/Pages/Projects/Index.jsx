import Pagination from "@/Components/Pagination";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from '@inertiajs/react';

export default function Index({projects}) {
    console.log(projects);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                           <table className="w-full text-sm text-left text-gray-500">
                            
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-3">Name</th>
                                    <th className="px-3 py-3">Image</th>
                                    <th className="px-3 py-3">Description</th>
                                    <th className="px-3 py-3">Status</th>
                                    <th className="px-3 py-3">Due Date</th>
                                    <th className="px-3 py-3">Created By</th>
                                    <th className="px-3 py-3">Updated By</th>
                                    <th className="px-3 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-3 py-3">Name</th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3">Status</th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3"></th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {projects.data.map((project) => (
                                    <tr key={project.id} className="bg-white border-b">
                                        <td className="px-3 py-2">{project.name}</td>
                                        <td className="px-3 py-2">
                                            <img src={project.image_path} alt={project.name} className="w-10 h-10 rounded-full" />
                                        </td>
                                        <td className="px-3 py-2">{project.description}</td>
                                        <td className="px-3 py-2">
                                            <span className={`px-3 py-1 rounded-md text-white ${PROJECT_STATUS_CLASS_MAP[project.status]}`}>
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-nowrap">{project.due_date}</td>
                                        <td className="px-3 py-2 text-nowrap">{project.createdBy.name}</td>
                                        <td className="px-3 py-2 text-nowrap">{project.updatedBy.name}</td>
                                        <td className="px-3 py-2 text-center">
                                            <Link href={route('projects.show', project.id)} className="text-blue-500 font-medium hover:underline mx-1">View</Link>
                                            <Link href={route('projects.edit', project.id)} className="text-blue-500 font-medium hover:underline mx-1">Edit</Link>
                                            <Link href={route('projects.destroy', project.id)} className="text-red-600 font-medium hover:underline mx-1">Delete</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                           </table>
                           <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
