let back = document.getElementById('ref_link_expo');

if(back){
  back.addEventListener('click', function(e) {
    history.back();
  })
}
