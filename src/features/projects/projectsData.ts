export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  achievements: string[];
  techStack: string[];
  githubUrl: string;
  category: "Visualization" | "Database" | "Analysis";
  metrics: { label: string; value: string }[];
}

export const projectsData: Project[] = [
  {
    id: "zomato-analysis",
    title: "Zomato Restaurant Data Diagnostics & BI Dashboard",
    subtitle: "Exploratory Data Analysis & Pricing Strategy Insights",
    description:
      "Engineered an end-to-end data analytics workflow on Zomato's restaurant dataset to identify factors driving customer ratings and optimal restaurant locations. Deployed interactive dashboards in Power BI for operational business insights.",
    achievements: [
      "Cleansed and structured raw data using Pandas and NumPy, resolving 15%+ missing geolocation records and inconsistent pricing syntax.",
      "Conducted detailed Exploratory Data Analysis (EDA) in Matplotlib and Seaborn, discovering that restaurants offering online ordering carried a 20% higher average rating.",
      "Developed a responsive multi-page Power BI dashboard featuring dynamic drill-downs by location, average cost-for-two, and cuisine categories.",
      "Synthesized critical business expansion recommendations, identifying under-served geographical hubs and high-potential low-competition cuisines."
    ],
    techStack: ["Python", "SQL", "MySQL", "Pandas", "NumPy", "Power BI", "Matplotlib", "Seaborn"],
    githubUrl: "https://github.com/okritu",
    category: "Visualization",
    metrics: [
      { label: "Data Cleaned", value: "15% Nulls Resolved" },
      { label: "Insights Generated", value: "4 Key Recommendations" },
      { label: "Dashboard Views", value: "Interactive Drilldowns" }
    ]
  },
  {
    id: "stock-market-intelligence",
    title: "Stock Market Volatility & Trend Intelligence",
    subtitle: "Database Architecture & Financial Analytics Platform",
    description:
      "Designed and implemented a database and reporting schema in MySQL to analyze historical stock transactions. Conducted statistical volatility modeling in Jupyter Notebooks and engineered a financial dashboard in Power BI to track stock trends.",
    achievements: [
      "Engineered a normalized database schema in MySQL and loaded historical stock transaction records to optimize querying speed.",
      "Wrote advanced SQL queries utilizing Common Table Expressions (CTEs), Subqueries, and Joins to calculate rolling 30-day moving averages.",
      "Conducted volume-volatility profiling in Python, identifying strong statistical correlations between trading volumes and subsequent price breakouts.",
      "Built a stock market dashboard in Power BI presenting volume trends, volatility indices, and historical gains trackers."
    ],
    techStack: ["Python", "SQL", "MySQL", "Pandas", "NumPy", "Power BI", "Excel", "Matplotlib"],
    githubUrl: "https://github.com/okritu",
    category: "Database",
    metrics: [
      { label: "Data Handled", value: "Historical Time-Series" },
      { label: "SQL Queries", value: "CTEs & Window Funcs" },
      { label: "Analytics Focus", value: "Volatility Tracking" }
    ]
  },
  {
    id: "linkedin-job-analytics",
    title: "LinkedIn Hiring Market & Remote Work Analytics",
    subtitle: "Ingestion Pipelines & Talent Supply Dashboarding",
    description:
      "Designed an analytical project to capture and study tech hiring trends. Structured job profiles to map remote-work allocations, language requirements, and hiring frequencies across geographical software hubs.",
    achievements: [
      "Wrote Python scripts to parse tech job postings, converting nested semi-structured JSON structures into clean tabular rows.",
      "Applied regular expressions (Regex) in Pandas to categorize tech requirements, standardizing over 30+ separate naming variations for programming languages.",
      "Crafted SQL queries in MySQL to compute hiring frequencies, remote vs. on-site ratios, and top hiring cities.",
      "Built a recruitment intelligence dashboard in Power BI illustrating talent supply, hot locations, and skill-demand distributions."
    ],
    techStack: ["Python", "SQL", "MySQL", "Pandas", "NumPy", "Power BI", "Regular Expressions"],
    githubUrl: "https://github.com/okritu",
    category: "Analysis",
    metrics: [
      { label: "Data Preprocessing", value: "JSON to Tabular" },
      { label: "Skills Mapped", value: "30+ Classifications" },
      { label: "BI Target", value: "Hiring Trends Dashboard" }
    ]
  }
];
