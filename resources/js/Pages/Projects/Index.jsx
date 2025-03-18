import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from '@inertiajs/react';

export default function Index({projects, queryParams = null}) {
    queryParams = queryParams || {};
    
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('projects.index'), queryParams);
    }

    const searchFieldKeyPressed = (name, e) => {
        if (e.key === 'Enter') {
            searchFieldChanged(name, e.target.value);
        }
    }

    const sortFieldChanged = (name) => {
        queryParams.sort_field = name;
        queryParams.sort_direction = queryParams.sort_direction === 'asc' ? 'desc' : 'asc';
        router.get(route('projects.index'), queryParams);
    }

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
                                        <th onClick={() => sortFieldChanged('name')} className="px-3 py-3">Name</th>
                                        <th className="px-3 py-3">Image</th>
                                        <th onClick={() => sortFieldChanged('description')} className="px-3 py-3">Description</th>
                                        <th onClick={() => sortFieldChanged('status')} className="px-3 py-3">Status</th>
                                        <th onClick={() => sortFieldChanged('due_date')} className="px-3 py-3">Due Date</th>
                                        <th onClick={() => sortFieldChanged('created_at')} className="px-3 py-3">Created At</th>
                                        <th onClick={() => sortFieldChanged('created_by')} className="px-3 py-3">Created By</th>
                                        <th className="px-3 py-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-3 py-3">
                                            <TextInput 
                                                className="w-full"
                                                defaultValue={queryParams.name}
                                                placeholder="Project Name" 
                                                onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                                onKeyPress={e => searchFieldKeyPressed('name', e)}
                                            />
                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3">
                                            <SelectInput 
                                                className="w-full"
                                                defaultValue={queryParams.status}
                                                onChange={(e) => searchFieldChanged('status', e.target.value)}
                                            >
                                                <option value="">Select Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </SelectInput>
                                        </th>
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
                                            <td className="px-3 py-2 text-nowrap">{project.created_at}</td>
                                            <td className="px-3 py-2 text-nowrap">{project.createdBy.name}</td>
                                            <td className="px-3 py-2 text-center">
                                                <Link href={route('projects.show', project.id)} className="text-green-500 font-medium hover:underline mx-1">View</Link>
                                                <Link href={route('projects.edit', project.id)} className="text-blue-500 font-medium hover:underline mx-1">Edit</Link>
                                                <Link href={route('projects.destroy', project.id)} className="text-red-500 font-medium hover:underline mx-1">Delete</Link>
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
