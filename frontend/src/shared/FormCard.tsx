type FormCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const FormCard = ({title, children, className}: FormCardProps) => {
    return ( 
        <div className={`mx-auto bg-white rounded-xl shadow-md p-8 ${className}`}>
            
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
                {title}
            </h2>
            {children}
        </div>
     );
}
 
export default FormCard;