type FormCardProps = {
  title: string;
  children: React.ReactNode;
};

const FormCard = ({title, children}: FormCardProps) => {
    return ( 
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
            
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
                {title}
            </h2>
            {children}
        </div>
     );
}
 
export default FormCard;