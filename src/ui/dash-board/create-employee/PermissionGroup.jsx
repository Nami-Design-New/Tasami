import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PermissionItem from "./PermissionItem";

const PermissionGroup = ({
  title,
  permissions,
  selectedPermissionIds,
  onTogglePermission,
  onToggleAll,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const permissionIds = permissions.map((permission) => permission.id);
  const allSelected =
    permissionIds.length > 0 &&
    permissionIds.every((permissionId) =>
      selectedPermissionIds.has(permissionId),
    );

  const toggleAccordion = () => {
    setIsOpen((current) => !current);
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
      <div className="permission__header" onClick={toggleAccordion}>
        <h3 className="permission__title">{title}</h3>
        <label className="permission__switch">
          <input
            type="checkbox"
            checked={isOpen}
            onChange={toggleAccordion}
            onClick={(event) => event.stopPropagation()}
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
              <label className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={() => onToggleAll(permissionIds, !allSelected)}
                />

                {t("dashboard.permissions.selectAll")}
              </label>
            </motion.div>

            {permissions.map((permission) => (
              <motion.div
                key={permission.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <PermissionItem
                  label={permission.title.trim()}
                  id={permission.id}
                  checked={selectedPermissionIds.has(permission.id)}
                  onChange={() => onTogglePermission(permission.id)}
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
