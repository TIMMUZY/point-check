import styles from './Tabs.module.css'
const Tab = ({ label, activeTab, onClick }) => (
    <div
      className={`${styles.tab} ${activeTab === label ? styles.activeTab : ''}`}
      onClick={() => onClick(label)}
    >
      {label}
    </div>
  );
  
  export const Tabs = ({ tabs, onTabClick, activeTab }) => (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <Tab
          key={tab}
          label={tab}
          activeTab={activeTab}
          onClick={onTabClick}
        />
      ))}
    </div>
  );