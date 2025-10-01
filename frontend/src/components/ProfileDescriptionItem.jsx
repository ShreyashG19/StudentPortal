
function ProfileDescriptionItem({ label, value }) {
    return (
        <div className="py-3 flex justify-between items-center">
            <span className="text-gray-500 font-medium text-lg">{label}</span>
            <span className="text-gray-800 font-semibold text-lg">{value}</span>
        </div>
    );
}

export default ProfileDescriptionItem;
