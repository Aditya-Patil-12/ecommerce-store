
export default function paginationDisplay({pageNumber,totalPages}){
    // console.log("what is the input");
    
    if( totalPages <= 6 ){
        if( totalPages === 0 ){
            return [];
        } 
        let pages = [];
        for(let page=1;page<=totalPages;page++){
            pages.push(page);
        }
        return pages;
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
