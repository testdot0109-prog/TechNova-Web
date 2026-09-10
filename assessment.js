const core = [
  ['sampling','Statistical foundations','Which sampling method gives every member of a population an equal chance of selection?',['Convenience sampling','Simple random sampling','Quota sampling','Snowball sampling'],1],
  ['median','Statistical foundations','Which measure is least affected by an extreme outlier?',['Mean','Range','Median','Variance'],2],
  ['privacy','Data governance','Before sharing data containing personal information, you should first:',['Publish it','Remove or protect identifiers','Convert it to PDF','Email everyone'],1],
  ['quality','Data quality','A check for repeated records is checking:',['Completeness','Uniqueness','Timeliness','Relevance'],1],
  ['visual','Data communication','Which chart is generally best for showing a trend over time?',['Line chart','Pie chart','Table only','Treemap'],0],
  ['security','Digital governance','What is the safest response to an unexpected password-request link?',['Open privately','Forward it','Verify and report it','Reply with password'],2],
  ['api','Digital systems','An API is primarily used to:',['Print reports','Let software systems exchange data','Encrypt every file','Replace databases'],1],
  ['bias','Statistical foundations','Non-response bias occurs when:',['The sample is too large','Non-responders differ from responders','Answers are anonymous','A report has errors'],1],
  ['metadata','Data practice','Metadata helps explain:',['A dataset and how it was produced','Only file size','Passwords','Chart colours'],0],
  ['mean','Statistical foundations','The arithmetic mean is calculated by:',['Adding values and dividing by their number','Choosing the middle value','Selecting the largest value','Counting blanks'],0]
];
const tech = {
  Python: [['python-frame','Python','In Python data analysis, a DataFrame is:',['A chart','A two-dimensional labelled data table','A password manager','A browser'],1],['python-missing','Python','Why inspect missing values before analysis?',['They never matter','They can influence results','They shrink files','They improve security'],1]],
  SQL: [['sql-select','SQL','Which SQL statement retrieves records from a table?',['GET','SELECT','FETCH ALL','PICK'],1],['sql-where','SQL','Which SQL clause filters rows?',['ORDER BY','WHERE','GROUP BY','JOIN'],1]],
  R: [['r-vector','R','In R, a vector is commonly used to:',['Store a sequence of values','Create passwords','Publish sites','Encrypt sheets'],0],['r-repro','R','A reproducible R analysis should include:',['Only a screenshot','Code and documented steps','An email address','A printed chart'],1]],
  Excel: [['excel-pivot','Excel','A PivotTable is useful for:',['Changing colours','Summarising tabular data','Sending mail','Creating passwords'],1],['excel-valid','Excel','Data validation helps to:',['Restrict entries to acceptable values','Delete data','Make charts 3D','Hide columns'],0]],
  'Data Visualization': [['viz-audience','Data visualization','Before designing a dashboard, identify:',['Audience and decision needs','Most decorative palette','Longest title','Most complex chart'],0],['viz-scale','Data visualization','A misleading chart scale can:',['Improve quality','Exaggerate or hide differences','Remove outliers','Make data anonymous'],1]],
  'Machine Learning': [['ml-train','Machine learning','A training dataset is used to:',['Teach a model patterns','Store passwords','Write policy','Replace collection'],0],['ml-bias','Machine learning','Why test a model for bias?',['Make it slower','Check unfair outcomes','Remove all data','Avoid documentation'],1]]
};
const domains = {
  'Labour Statistics': [['labour-force','Labour statistics','The labour force includes employed people and people who are:',['Retired','Actively seeking and available for work','All students','Below working age'],1],['labour-period','Labour statistics','Why should a reference period be clear for unemployment rates?',['It changes chart definitions','Conditions vary across periods','It removes sampling','It makes data confidential'],1]],
  'Population & Demography': [['demo-rate','Demography','A rate is often used instead of a count because it:',['Allows comparison across population sizes','Is always larger','Eliminates errors','Needs no denominator'],0],['demo-cohort','Demography','A cohort is a group sharing:',['An address','An event or characteristic over time','A survey response','A salary'],1]],
  'Economic Statistics': [['econ-index','Economic statistics','An index number commonly shows:',['Change relative to a base period','A list of names','Raw survey responses','Password strength'],0],['econ-real','Economic statistics','Real values are adjusted for:',['Internet speed','Price changes','Email addresses','Sample size only'],1]],
  'Health Statistics': [['health-prev','Health statistics','Prevalence refers to:',['New cases only','Existing cases in a population','Hospital costs','All surveys'],1],['health-denom','Health statistics','A denominator in a health rate provides:',['Population at risk','Graph format','Collection replacement','Confidentiality'],0]],
  'Agriculture & Environment': [['agri-season','Agriculture','Why does seasonality matter for crop data?',['Activity varies through the year','It makes values equal','It removes weather','It replaces fieldwork'],0],['agri-gis','Agriculture','GIS is especially useful for:',['Location-based data analysis','Email newsletters','Passwords','Replacing surveys'],0]]
};
const advanced = [['confidence','Applied statistics','A narrower confidence interval is often associated with:',['A larger sample, all else equal','More missing data','No design weights','A smaller population automatically'],0],['audit','Data practice','An auditable workflow should use:',['Overwritten source files','Versioned code, data steps and assumptions','Only final slides','Shared credentials'],1]];
const beginner = [['beginner-rate','Statistical foundations','A percentage is a value expressed out of:',['10','100','1,000','A population only'],1],['beginner-clean','Data quality','Data cleaning aims to:',['Prepare reliable data for use','Add duplicate records','Hide all errors','Replace documentation'],0]];
const toQuestion = ([id,category,question,options,answer]) => ({id,category,question,options,answer});
export function createAssessment(profile, level) {
  const selected = profile.techSkills?.length ? profile.techSkills : ['Excel','Data Visualization'];
  const pool = [...(domains[profile.domain] || domains['Labour Statistics']), ...selected.flatMap(x => tech[x] || []), ...(level === 'Advanced' ? advanced : level === 'Beginner' ? beginner : []), ...core].map(toQuestion);
  const unique = [...new Map(pool.map(q => [q.id,q])).values()]; let result = [...unique], cycle = 1;
  while (result.length < 20) { unique.forEach(q => result.push({...q,id:`${q.id}-${cycle}`})); cycle++; }
  return result.slice(0,20);
}
