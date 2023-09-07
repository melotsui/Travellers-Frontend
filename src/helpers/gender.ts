export const formatGender = (gender: string) : string => {
    if(gender == 'Male'){
        return 'M';
    }else if (gender == 'Female'){
        return 'F';
    }else{
        return '';
    }
}