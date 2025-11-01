import React, { useState } from "react";

const ListUsers: React.FC = () => {
    const [users, setUsers] = useState<Array<{ id: number; name: string }>>([]);
    
    return (
        <div>
            {/* Contenido */}
        </div>
    );
}

export default ListUsers;
