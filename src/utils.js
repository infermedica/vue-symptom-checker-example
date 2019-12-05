export function findIndex(array, id) {
  return array.findIndex((item) => {
    return item.id === id;
  });
}

export const arrayContains = (array, object) => {
  return (array.findIndex((item) => {
    return item[String(Object.keys(object))]
      === String(Object.values(object));
  }) !== -1);
};

export const mapRiskFactors = (constFactors, riskFactors) => {
  return constFactors.map((factorId) => {
    const index = findIndex(riskFactors, factorId);
    if (index < 0) return null;

    return {
      id: riskFactors[index].id,
      common_name: riskFactors[index].common_name,
      category: riskFactors[index].category
    };
  }).filter((riskFactor) => !!riskFactor);
};

export const selectedEvidences = (evidencesGetter, evidences) => {
  return evidences.filter((evidence) => {
    return evidencesGetter.some((evidenceGetter) => {
      return ((evidenceGetter.id === evidence.id) && (evidence.choice_id === 'present'));
    });
  }).map((evidence) => evidence.id);
};
