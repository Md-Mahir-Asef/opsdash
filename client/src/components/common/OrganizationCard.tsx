import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users } from 'lucide-react';
import { Card } from './Card';

interface OrganizationData {
    name: string;
    imageUrl: string;
    members: number;
    role: string;
    id: string;
}

interface OrganizationCardProps {
    organization: OrganizationData;
}

export const OrganizationCard: React.FC<OrganizationCardProps> = ({
    organization
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/organizations/${organization.id}`);
    };

    return (
        <Card 
            hover={true}
            className="cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            onClick={handleClick}
        >
            {/* Header with image, name, and ID */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    {organization.imageUrl ? (
                        <img
                            src={organization.imageUrl}
                            alt={organization.name}
                            className="w-12 h-12 rounded-lg object-cover"
                        />
                    ) : (
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-primary-600" />
                        </div>
                    )}
                    <div>
                        <h3 className="text-lg font-semibold text-dark-900">
                            {organization.name}
                        </h3>
                        <span className="text-sm text-dark-500">
                            ID: {organization.id}
                        </span>
                    </div>
                </div>
            </div>

            {/* Role badge */}
            <div className="mb-4">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {organization.role}
                </span>
            </div>

            {/* Members count */}
            <div className="flex items-center space-x-2 text-dark-600">
                <Users className="w-4 h-4" />
                <span className="text-sm">
                    {organization.members} {organization.members === 1 ? 'member' : 'members'}
                </span>
            </div>
        </Card>
    );
};
