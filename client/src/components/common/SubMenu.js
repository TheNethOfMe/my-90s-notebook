import React from "react";

const SubMenu = ({ tabs, tabSelect, selected }) => {
  return (
    <div>
      <div className="submenu">
        {tabs.map((tab, idx) => {
          const btnClass = `submenu__item-${idx}`;
          const selectedClass =
            selected === tab.link ? "submenu__item-select" : "submenu__item";
          return (
            <div
              className={btnClass}
              key={idx}
              onClick={() => tabSelect(tab.link)}
            >
              <h5 className={selectedClass}>{tab.title}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubMenu;
