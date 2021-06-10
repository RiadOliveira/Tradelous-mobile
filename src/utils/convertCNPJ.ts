const convertCNPJ = (cnpj: number): string => {
    const companyCNPJ: string[] = [];

    let originalCNPJIndex = 0;
    for (let ind = 0; ind < 18; ind++, originalCNPJIndex++) {
        switch (ind) {
            case 2:
            case 6:
                companyCNPJ[ind] = '.';
                originalCNPJIndex--;
                break;

            case 10:
                companyCNPJ[ind] = '/';
                originalCNPJIndex--;
                break;

            case 15:
                companyCNPJ[ind] = '-';
                originalCNPJIndex--;
                break;
            default:
                companyCNPJ[ind] = cnpj.toString()[originalCNPJIndex];
                break;
        }
    }

    return companyCNPJ.join('');
};

export default convertCNPJ;
