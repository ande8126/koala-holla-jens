console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();
  

}); // end doc ready

function setupClickListeners() {
  $( '#viewKoalas' ).on( 'click', '.transferKoalaButton', transferKoala );
  $( '#viewKoalas' ).on( 'click', '.deleteKoalaButton', deleteKoala );
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $( '#nameIn' ).val(),
      age: $( '#ageIn' ).val(),
      gender: $('#genderIn').val(),
      ready_to_transfer: $( '#readyForTransferIn' ).val(),
      notes: $( '#notesIn' ).val(),
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
    clearInputs();
    
  }); 
}

function deleteKoala(){
  const myId = $( this ).closest( 'tr' ).data( 'id' );
  console.log( 'in deleteKoala:', myId );
  swal({
    text: "Are you sure you want to delete your koala?",
    button: "OK"
    })
      $.ajax({
        method: 'DELETE',
        url: '/koalas/' + myId
      }).then( function( response ){
        console.log( 'back from delete with:', response );
        getKoalas();
      }).catch( function( err ){
        console.log( err );
        alert( 'delete not working');
      })
}//end delete Koala

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
    $.ajax({
        method: 'GET',
        url: '/koalas'
    }).then( function ( response ){
      console.log( 'back from GET with:', response );
      showKoalas(response);
    }).catch( function ( err ){
      alert( 'error!');
      console.log( err );
    })//end ajax 
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: newKoala
  }).then( function ( response ){
    console.log( 'back from POST with:', response );
    getKoalas();
  }).catch( function ( error ) {
    console.log( error );
    alert( 'error posting koalas' );
  })
} // end saveKoala

function showKoalas(koalas){
    let el = $('#viewKoalas');
    el.empty();
    for (let i = 0; i < koalas.length; i++) {
      let transferKoala = `<button data-id="${koalas[i].id}" class="transferKoalaButton">Ready for Transfer</button>`;
      if (koalas[i].ready_to_transfer){
        transferKoala = '';
      }//end if
      el.append( `<tr data-id="${koalas[i].id}">
        <td>${koalas[i].name}</td>
        <td>${koalas[i].age}</td>
        <td>${koalas[i].gender}</td>
        <td>${koalas[i].ready_to_transfer}</td>
        <td>${koalas[i].notes}</td>
        <td>${transferKoala}</td>
        <td><button class="deleteKoalaButton">Delete</button>
        </tr>`)
    } // end for
    
}//end showKoalas

function transferKoala(){
  const myId = $(this).data( 'id' );
  console.log( 'in transferKoala:', myId );
  
  $.ajax({
    method: 'PUT',
    url: '/koalas/' + myId
  }).then( function (response){
    console.log ( 'back from PUT', response );
    getKoalas();
  }).catch( function ( err ){
    console.log( err );
    alert( 'you have failed, but youre great' );
  })
}//end transferKoala

function clearInputs(){
  $( '#nameIn' ).val('');
  $( '#ageIn' ).val('');
  $('#genderIn').val('');
  $( '#readyForTransferIn' ).val('');
  $( '#notesIn' ).val('');
};