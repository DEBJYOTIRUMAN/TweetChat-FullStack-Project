import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

const SearchBar = ({contactSearch, userContacts, setContactSearch, setFilteredContacts}) => {
  return (
    <div className="bg-conversation-panel-background flex py-3 pl-5 items-center gap-3 h-14">
      <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">
        <div>
          <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-lg" />
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="Search Chat"
            className="bg-transparent text-sm focus:outline-none text-white w-full"
            value={contactSearch}
            onChange={(e) => {
              const filteredContacts = userContacts.filter((contact) =>
                contact.name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              );
              setContactSearch(e.target.value);
              setFilteredContacts(filteredContacts);
            }}
          />
        </div>
      </div>
      <div className="pr-5 pl-3">
        <BsFilter className="text-panel-header-icon cursor-pointer text-lg" />
      </div>
    </div>
  );
};

export default SearchBar;
