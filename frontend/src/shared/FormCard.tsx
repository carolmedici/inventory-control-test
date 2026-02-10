import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type FormCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  rightAction?: React.ReactNode;
};

const FormCard = ({title, children, className, rightAction}: FormCardProps) => {
    const navigate = useNavigate();

    return ( 
        <div className={`bg-white shadow rounded-xl p-6 mx-auto ${className ?? ''}`}>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <button
                    onClick={() => navigate(-1)}
                    className="text-gray-500 hover:text-gray-800 cursor-pointer"
                    >
                    <ArrowLeft size={20} />
                    </button>

                    <h2 className="text-xl font-semibold">{title}</h2>
                </div>

                {rightAction && <div>{rightAction}</div>}
            </div>

            
            {children}
        </div>
     );
}
 
export default FormCard;