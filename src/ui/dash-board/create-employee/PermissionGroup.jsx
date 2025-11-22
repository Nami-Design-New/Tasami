import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PermissionItem from "./PermissionItem";

const PermissionGroup = ({ title, permissions, groupId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    Array(permissions.length).fill(false)
  );

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const toggleItem = (index) => {
    const updated = [...checkedItems];
    updated[index] = !updated[index];
    setCheckedItems(updated);
  };

  const toggleAll = () => {
    const allSelected = checkedItems.every(Boolean);
    setCheckedItems(Array(permissions.length).fill(!allSelected));
  };

  const panelVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 24,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={`permission__group ${isOpen ? "open" : ""}`}>
      <div
        className="permission__header"
        onClick={() => {
          toggleAccordion();
        }}
      >
        <h3 className="permission__title">{title}</h3>
        <label className="permission__switch">
          <input
            type="checkbox"
            checked={isOpen}
            onChange={toggleAccordion}
            onClick={(e) => {
              e.stopPropagation();

              toggleAccordion();
            }}
          />
          <span className="slider"></span>
        </label>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="permission__items"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={panelVariants}
          >
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="permission__item permission__select-all"
            >
              <label>
                <input
                  type="checkbox"
                  checked={checkedItems.every(Boolean)}
                  onChange={toggleAll}
                />
                تحديد الكل
              </label>
            </motion.div>

            {permissions.map((perm, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <PermissionItem
                  label={perm.trim()}
                  id={`${groupId}-perm-${index}`}
                  checked={checkedItems[index]}
                  onChange={() => toggleItem(index)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PermissionGroup;
