
export default function paginationDisplay(pageNumber,totalPages){
    if( totalPages <= 6 ){
        return Array.from({length:totalPages});
    }
    if( pageNumber <= 3 ){
        return ["1","2","3","4","...",totalPages];
    }
    else if( pageNumber >= (totalPages-2)  ){
        return [
          "1",
          "...",
          `${totalPages - 3}`,
          `${totalPages - 2}`,
          `${totalPages-1}`,
          totalPages,
        ];
    }
    else{
        return ["1", "...", `${pageNumber}`, `${pageNumber+1}`,"...",`${totalPages}`];
    }
}