import { useDesignLibrary } from "./context/DesignLibraryContext";

const Navbar = () => {
    const { library, setLibrary } = useDesignLibrary();

    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow-md border-b">
        <h1 className="text-xl font-bold">Sistema de Seguridad</h1>
        <div className="flex items-center gap-2">
            <label htmlFor="design" className="font-medium">
            Librería:
            </label>
            <select
            id="design"
            value={library}
            onChange={(e) => setLibrary(e.target.value as any)}
            className="border p-2 rounded"
            >
            <option value="tailwind">Tailwind CSS</option>
            <option value="bootstrap">Bootstrap</option>
            <option value="materialui">Material UI</option>
            </select>
        </div>
        </nav>
    );
};

export default Navbar;
