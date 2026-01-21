$(window).on("scroll", function () {
  "use strict";
  if ($(window).scrollTop() > 600) {
    if ($(window).width() > 768) {
      $(".view-cart-bar").removeClass("d-none");
    } else {
      $(".view-cart-bar").addClass("d-none");
    }
  } else {
    $(".view-cart-bar").addClass("d-none");
  }
});

$("#closebtn-viewbar").click(function () {
  $(".view-cart-bar-2").addClass("d-none");
});

$("#column").on("click", function () {
  "use strict";
  $("#column-view").addClass("d-none");
  $("#column").addClass("service-active");
  $(".listing-view").removeClass("d-none");
  $("#grid").removeClass("service-active");
});
$("#grid").on("click", function () {
  "use strict";
  $("#column-view").removeClass("d-none");
  $("#column").removeClass("service-active");
  $(".listing-view").addClass("d-none");
  $("#grid").addClass("service-active");
});

$(".footer-fiechar-slider").owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  rtl: direction == 2 ? true : false,
  autoplay: true,
  autoplayTimeout: 4000,
  autoplaySpeed: 3000,
  dots: true,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 1
    },
    768: {
      items: 2
    },
    991: {
      items: 2
    }
  }
});

// add blur class when modal show
$(document).ready(function () {
  // Function to add blur class to wrapper when modal has 'show' class
  function addBlurOnModalShow() {
    if ($(".modal").hasClass("show")) {
      $("#main-content .wrapper").addClass("blur");
    }
  }

  // Call the function on document ready
  addBlurOnModalShow();

  // Event listener for modal visibility changes
  $(".modal").on("shown.bs.modal", function () {
    $("#main-content .wrapper").addClass("blur");
  });

  $(".modal").on("hidden.bs.modal", function () {
    $("#main-content .wrapper").removeClass("blur");
  });
});

// for-header-sticky
$(window).scroll(function () {
  "use strict";
  if ($(this).scrollTop() > 80) {
    $("#header1").addClass("fixed-top");
  } else {
    $("#header1").removeClass("fixed-top");
  }
});
// for-disable-input-characters
$("#card_number, #card_cvc, #amount, .numbers_only").keyup(function () {
  "use strict";
  var val = $(this).val();
  if (isNaN(val)) {
    val = val.replace(/[^0-9\.]/g, "");
    if (val.split(".").length > 2) {
      val = val.replace(/\.+$/, "");
    }
  }
  $(this).val(val);
});

$("img[data-enlargable]").addClass("img-enlargable").click(function () {
  "use strict";
  var src = $(this).attr("src");
  $("<div>")
    .css({
      background: "RGBA(0,0,0,.5) url(" + src + ") no-repeat center",
      backgroundSize: "contain",
      width: "100%",
      height: "100%",
      position: "fixed",
      zIndex: "10000",
      top: "0",
      left: "0",
      cursor: "zoom-out"
    })
    .click(function () {
      $(this).remove();
    })
    .appendTo("body");
});

function myFunction() {
  "use strict";
  toastr.error("This operation was not performed due to demo mode");
}

// For all sweet-alerts
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success mx-1",
    cancelButton: "btn btn-danger mx-1"
  },
  buttonsStyling: false
});
function swal_cancelled(issettitle) {
  "use strict";
  var title = wrong;
  if (issettitle) {
    title = "" + issettitle + "";
  }
  swalWithBootstrapButtons.fire("Cancelled", title, "error");
}
function restaurantclosed() {
  "use strict";
  swalWithBootstrapButtons
    .fire({
      icon: "error",
      title: restaurant_closed,
      showCancelButton: false,
      confirmButtonText: okay,
      reverseButtons: true
    })
    .then(result => {
      result.dismiss === Swal.DismissReason.cancel;
    });
}
function ordersuccess(order_id, continueurl) {
  "use strict";
  window.location = continueurl + "/success-" + order_id;
}
function removefromcart(nexturl, note, goto_cart) {
  "use strict";
  swalWithBootstrapButtons
    .fire({
      icon: "warning",
      title: are_you_sure,
      text: note,
      showCancelButton: true,
      confirmButtonText: goto_cart,
      cancelButtonText: no,
      closeOnConfirm: false,
      closeOnCancel: false,
      reverseButtons: true
    })
    .then(result => {
      if (result.isConfirmed) {
        window.location = nexturl;
      } else {
        result.dismiss === Swal.DismissReason.cancel;
      }
    });
}
function logout(nexturl, are_you_sure_logout, logout) {
  "use strict";
  swalWithBootstrapButtons
    .fire({
      icon: "warning",
      title: are_you_sure_logout,
      showCancelButton: true,
      confirmButtonText: logout,
      cancelButtonText: no,
      closeOnConfirm: false,
      closeOnCancel: false,
      reverseButtons: true
    })
    .then(result => {
      if (result.isConfirmed) {
        window.location = nexturl;
      } else {
        result.dismiss === Swal.DismissReason.cancel;
      }
    });
}

function managefavorite(id, type, manageurl) {
  "use strict";
  $.ajax({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    },
    url: manageurl,
    data: {
      id: id,
      type: type,
      favurl: manageurl
    },
    method: "POST",
    success: function (response) {
      if (window.location.href.includes("favouritelist")) {
        location.reload();
      } else {
        $(".set-fav-" + id).html(response.data);
      }
    },
    error: function () {
      toastr.error(wrong);
      return false;
    }
  });
}

function addtocart(addcarturl, id, buynow) {
  "use strict";
  var errorDetected = false; // Flag to track if any error is detected
  var addongroups = $("#addongroup_" + id).data("addongroup_val");

  addongroups.forEach(group => {
    $("#item_addons_group_" + id + "_" + group.id).each(function () {
      if (group.availableAddons != "") {
        var selectedCount = $(
          "input[name='addons_id_" + group.id + "_" + id + "']:checked"
        ).length;
        if (group.selection_type == 1) {
          if (selectedCount < group.min_count) {
            $(
              "input[name='addons_id_" +
              group.id +
              "_" +
              id +
              "'][type='checkbox']:not(:checked)"
            ).prop("disabled", false);
            $(".addons_error_" + group.id + "_" + id).text(
              "Please select at least " + group.min_count + " addon(s)"
            );
            errorDetected = true; // Set flag to true indicating an error is detected
          }
        } else if (group.selection_type == 2) {
          if (selectedCount >= group.max_count) {
            $(
              "input[name='addons_id_" +
              group.id +
              "_" +
              id +
              "'][type='checkbox']:not(:checked)"
            ).prop("disabled", true);
          }
        }
      }
    });
  });
  if (errorDetected) {
    // If any error is detected, prevent further actions like submitting the form
    return false;
  }
  if ($("#modalitemdetails").is(":visible")) {
    if (buynow == 0) {
      $(".addon_modal_cart").prop("disabled", true);
      $(".addon_modal_cart_loader").removeClass("d-none");
    } else {
      $(".addon_modal_quick_order").prop("disabled", true);
      $(".addon_modal_quick_order_loader").removeClass("d-none");
    }
  } else {
    if (buynow == 0) {
      $(".cart").prop("disabled", true);
      $(".cart_loader").removeClass("d-none");
    } else {
      $(".quick_order").prop("disabled", true);
      $(".quick_order_loader").removeClass("d-none");
    }
  }
  var slug = $("#slug_" + id).val();
  var item_name = $("#item_name_" + id).val();
  var item_type = $("#item_type_" + id).val();
  var image_name = $("#image_name_" + id).val();
  var item_tax = $("#item_tax_" + id).val();
  var item_price = $("#item_price_" + id).val();
  var addons_id = $(".addons_chk_" + id + ":checked")
    .map(function () {
      return $(this).attr("data-addons-id");
    })
    .get()
    .join("| ");
  var addons_name = $(".addons_chk_" + id + ":checked")
    .map(function () {
      return $(this).attr("data-addons-name");
    })
    .get()
    .join("| ");
  var addons_price = $(".addons_chk_" + id + ":checked")
    .map(function () {
      return $(this).attr("data-addons-price");
    })
    .get()
    .join("| ");
  var extras_id = $(".extras_chk_" + id + ":checked")
    .map(function () {
      return $(this).attr("data-extras-id");
    })
    .get()
    .join("| ");
  var extras_name = $(".extras_chk_" + id + ":checked")
    .map(function () {
      return $(this).attr("data-extras-name");
    })
    .get()
    .join("| ");
  var extras_price = $(".extras_chk_" + id + ":checked")
    .map(function () {
      return $(this).attr("data-extras-price");
    })
    .get()
    .join("| ");
  calladdtocart(
    slug,
    item_name,
    item_type,
    image_name,
    item_tax,
    item_price,
    addons_id,
    addons_name,
    addons_price,
    extras_id,
    extras_name,
    extras_price,
    addcarturl,
    buynow
  );
}

function addonaddtocart(addcarturl, id, buynow, cart_type) {

  if ($("#modalitemdetails").is(":visible")) {
    if (buynow == 0) {
      $(".addon_modal_cart").prop("disabled", true);
      $(".addon_modal_cart_loader").removeClass("d-none");
    } else {
      $(".addon_modal_quick_order").prop("disabled", true);
      $(".addon_modal_quick_order_loader").removeClass("d-none");
    }
  } else {
    if (buynow == 0) {
      $(".cart").prop("disabled", true);
      $(".cart_loader").removeClass("d-none");
    } else {
      $(".quick_order").prop("disabled", true);
      $(".quick_order_loader").removeClass("d-none");
    }
  }
  var slug = $("#slug_" + id).val();
  var item_name = $("#item_name_" + id).val();
  var item_type = $("#item_type_" + id).val();
  var image_name = $("#image_name_" + id).val();
  var item_tax = $("#item_tax_" + id).val();
  var item_price = $("#item_price_" + id).val();
  var qtys = parseInt($(".item_qty_" + slug).val());
  var addons_id = $(".addons_chk_" + id + ":checked")
    .map(function () {
      return $(this).attr("data-addons-id");
    })
    .get()
    .join("| ");
  var addons_name = $(".addons_chk_" + id + ":checked")
    .map(function () {
      return $(this).attr("data-addons-name");
    })
    .get()
    .join("| ");
  var addons_price = $(".addons_chk_" + id + ":checked")
    .map(function () {
      return $(this).attr("data-addons-price");
    })
    .get()
    .join("| ");
  var extras_id = $(".extras_chk_" + id + ":checked")
    .map(function () {
      return $(this).attr("data-extras-id");
    })
    .get()
    .join("| ");
  var extras_name = $(".extras_chk_" + id + ":checked")
    .map(function () {
      return $(this).attr("data-extras-name");
    })
    .get()
    .join("| ");
  var extras_price = $(".extras_chk_" + id + ":checked")
    .map(function () {
      return $(this).attr("data-extras-price");
    })
    .get()
    .join("| ");

  if (cart_type == 'addon_add_cart') {
    var frequently_bought_items = $(".frequently_bought_items_chk_" + id + ":checked").map(
      function () {
        return $(this).attr("frequently_bought_items-id");
      }).get().join("|");
  } else {
    var frequently_bought_items = "";
  }
  $('#addon_cart_btn').prop("disabled", true);
  $('#addon_cart_btn').html(
    '<span class="loader"></span>');
  setTimeout(function () {
    $('#addon_cart_btn').html('Add To Cart');
  }, 3000);
  $.ajax({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    },
    url: addcarturl,
    data: {
      slug: slug,
      item_name: item_name,
      item_type: item_type,
      image_name: image_name,
      tax: item_tax,
      item_price: item_price,
      qty: qtys,
      addons_id: addons_id,
      addons_name: addons_name,
      addons_price: addons_price,
      extras_id: extras_id,
      extras_name: extras_name,
      extras_price: extras_price,
      buynow: buynow,
      frequently_bought_items: frequently_bought_items,
    },
    method: "POST",
    dataType: "json",
    success: function (response) {
      if (response.status == 1) {
        toastr.success(response.message);
        location.reload();

        $(".cart-count").html(response.total_cart_count);
        $('#modalitemdetails').modal('hide');
      } else {
        $('#addon_cart_btn').prop("disabled", false);
        $('#addon_cart_btn').html('Add To Cart');
        toastr.error(response.message);
        $('#modalitemdetails').modal('hide');
      }
    },
    error: function () {
      $('#addon_cart_btn').prop("disabled", false);
      $('#addon_cart_btn').html('Add To Cart');
      toastr.error(wrong);
      $('#modalitemdetails').modal('hide');
      return false;
    }
  });
}


function calladdtocart(
  slug,
  item_name,
  item_type,
  image_name,
  item_tax,
  item_price,
  addons_id,
  addons_name,
  addons_price,
  extras_id,
  extras_name,
  extras_price,
  addcarturl,
  buynow
) {
  "use strict";
  var request_url = $("#request_url_" + slug).val();
  var qtys = parseInt($(".item_qty_" + slug).val());
  var login_required = $("#login_required_" + slug).val();
  var checklogin = $("#checklogin_" + slug).val();
  var customer_login = "";
  if ($("#customer_login_" + slug).val() != "") {
    var customer_login = JSON.parse($("#customer_login_" + slug).val());
  }
  $.ajax({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    },
    url: addcarturl,
    data: {
      slug: slug,
      item_name: item_name,
      item_type: item_type,
      image_name: image_name,
      tax: item_tax,
      item_price: item_price,
      qty: qtys,
      addons_id: addons_id,
      addons_name: addons_name,
      addons_price: addons_price,
      extras_id: extras_id,
      extras_name: extras_name,
      extras_price: extras_price,
      buynow: buynow
    },
    method: "POST",
    dataType: "json",
    success: function (response) {
      if (response.status == 1) {
        if (response.buynow == 1) {
          if (customer_login != "" && customer_login.activated == 1) {
            if (checklogin) {
              location.href = "checkout?buynow=1";
            } else if (login_required == 1) {
              if ($("#modalitemdetails").is(":visible")) {
                $("#modalitemdetails").modal("hide");
              }
              $(".quick_order").prop("disabled", false);
              $(".quick_order_loader").addClass("d-none");
              $("#useroption").modal("show");
            } else {
              location.href = "checkout?buynow=1";
            }
          } else {
            location.href = "checkout?buynow=1";
          }
        } else {
          if (
            response.total_item_count == qtys ||
            request_url == "item-" + slug
          ) {
            location.reload();
          } else {
            $(".cart-count").html(response.data);
            $(".item-total-qty-" + slug).val(response.total_item_count);
            toastr.success(response.message);
            $("input:checkbox").prop("checked", false);
            $("#modalitemdetails").modal("hide");
            if (response.buynow == 0) {
              $(".cart").prop("disabled", false);
              $(".cart_loader").addClass("d-none");
            } else {
              $(".quick_order").prop("disabled", false);
              $(".quick_order_loader").addClass("d-none");
            }
          }
        }
      } else if (response.status == 0) {
        $("#modalitemdetails").modal("hide");
        toastr.error(response.message);
        if (response.buynow == 0) {
          $(".cart").prop("disabled", false);
          $(".cart_loader").addClass("d-none");
        } else {
          $(".quick_order").prop("disabled", false);
          $(".quick_order_loader").addClass("d-none");
        }
      }
    },
    error: function () {
      $(".cart").prop("disabled", false);
      $(".cart_loader").addClass("d-none");
      $(".quick_order").prop("disabled", false);
      $(".quick_order_loader").addClass("d-none");
      toastr.error(wrong);
      $("#modalitemdetails").modal("hide");
    }
  });
}

function showitem(slug, showurl) {
  "use strict";
  $(".addon_modal_" + slug).prop("disabled", true);
  $(".addon_modal_icon_" + slug).addClass("d-none");
  $(".addon_modal_loader_" + slug).removeClass("d-none");
  $.ajax({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    },
    url: showurl,
    data: {
      slug: slug
    },
    method: "GET",
    dataType: "json",
    success: function (response) {
      $("#modalitem_body").html(response.output);
      $("#modalitemdetails").modal("show");
      getaddons(response.id);
      $(".addon_modal_" + slug).prop("disabled", false);
      $(".addon_modal_icon_" + slug).removeClass("d-none");
      $(".addon_modal_loader_" + slug).addClass("d-none");
    },
    error: function () {
      toastr.error(wrong);
      $(".addon_modal_" + slug).prop("disabled", false);
      $(".addon_modal_icon_" + slug).removeClass("d-none");
      $(".addon_modal_loader_" + slug).addClass("d-none");
    }
  });
}

function getaddons(id) {
  "use strict";

  var addongroups = $("#addongroup_" + id).data("addongroup_val");
  addongroups.forEach(group => {
    $("#item_addons_group_" + id + "_" + group.id).each(function () {
      if (group.availableAddons != "") {
        var selectedCount = $(
          "input[name='addons_id_" + group.id + "_" + id + "']:checked"
        ).length;
        if (group.selection_type == 1) {
          if (selectedCount < group.min_count) {
            $(
              "input[name='addons_id_" +
              group.id +
              "_" +
              id +
              "'][type='checkbox']:not(:checked)"
            ).prop("disabled", false);
            $(".addons_error_" + group.id + "_" + id)
              .removeClass("d-none")
              .text("Please select at least " + group.min_count + " addon(s)");
            $("#addon_required_icon_" + group.id + "_" + id)
              .removeClass("fa-circle-check text-success")
              .addClass("fa-triangle-exclamation");
            $("#addon_required_text_" + group.id + "_" + id)
              .removeClass("text-success")
              .addClass("addon_group_color");
          } else if (selectedCount >= group.max_count) {
            $(
              "input[name='addons_id_" +
              group.id +
              "_" +
              id +
              "'][type='checkbox']:not(:checked)"
            ).prop("disabled", true);
            $(".addons_error_" + group.id + "_" + id)
              .addClass("d-none")
              .text(""); // Clear error message if selection is valid
            $("#addon_required_icon_" + group.id + "_" + id)
              .removeClass("fa-triangle-exclamation")
              .addClass("fa-circle-check text-success");
            $("#addon_required_text_" + group.id + "_" + id)
              .removeClass("addon_group_color")
              .addClass("text-success");
          } else {
            $(
              "input[name='addons_id_" +
              group.id +
              "_" +
              id +
              "'][type='checkbox']:not(:checked)"
            ).prop("disabled", false);
            $(".addons_error_" + group.id + "_" + id)
              .addClass("d-none")
              .text(""); // Clear error message if selection is valid
            $("#addon_required_icon_" + group.id + "_" + id)
              .removeClass("fa-triangle-exclamation")
              .addClass("fa-circle-check text-success");
            $("#addon_required_text_" + group.id + "_" + id)
              .removeClass("addon_group_color")
              .addClass("text-success");
          }
        } else if (group.selection_type == 2) {
          if (selectedCount >= group.max_count) {
            $(
              "input[name='addons_id_" +
              group.id +
              "_" +
              id +
              "'][type='checkbox']:not(:checked)"
            ).prop("disabled", true);
          } else {
            $(
              "input[name='addons_id_" +
              group.id +
              "_" +
              id +
              "'][type='checkbox']:not(:checked)"
            ).prop("disabled", false);
          }
        }

      }
      add_frequently_product(id);
    });
  });
  var item_price = parseFloat($("#item_price_" + id).val());
  var addonstotal = 0;
  var subtotal = 0;

  var chk = document.querySelectorAll(".addons_chk_" + id + ":checked");
  if (chk.length) {
    chk.forEach(function (el) {
      addonstotal += parseFloat(el.getAttribute("data-addons-price"));
    });
  }
  subtotal = item_price + addonstotal;
  $(".subtotal_" + id).text(currency_format(subtotal));
}

function changeqty(item_slug, type) {
  var qtys = parseInt($(".item_qty_" + item_slug).val());
  if (type == "minus") {
    qty = qtys - 1;
  } else {
    qty = qtys + 1;
  }
  if (qty >= "1") {
    $(".item_qty_" + item_slug).val(qty);
  }
}

function checkout() {
  "use strict";
  var request_url = $("#request_url").val();
  if (request_url == "cart") {
    location.href = "checkout?buynow=0";
  } else {
    location.href = "checkout?buynow=1";
  }
}
function showlogin() {
  "use strict";
  window.location.href = "login";
}
function itemsallergens(item_id, item_url) {
  "use strict";
  $.ajax({
    url: item_url,
    type: "GET",
    data: {
      item_id: item_id
    },
    success: function (response) {
      $("#allergensDisplay").html(response.item_allergens);
      $("#itemallergens").modal("show");
    },
    error: function () {
      toastr.error(wrong);
    }
  });
}



function setLightMode() {
  document.documentElement.classList.remove('dark');
  document.documentElement.classList.add('light');
  localStorage.setItem('theme', 'light');
  $('#logoimage').attr('src', lightlogo);
  $('#footerlogoimage').attr('src', lightlogo);
}

function setDarkMode() {
  document.documentElement.classList.remove('light');
  document.documentElement.classList.add('dark');
  localStorage.setItem('theme', 'dark');
  $('#logoimage').attr('src', darklogo);
  $('#footerlogoimage').attr('src', darklogo);
}

// PWA JS //
if (window.matchMedia("(display-mode: standalone)").matches) {
  // If the app is installed, hide the install button or popup
  $(".pwa").addClass("d-none");
} else {
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", e => {
    $(".mobile_drop_down").show();
    deferredPrompt = e;
  });
  $("#close-btn").click(function () {
    $(".pwa").addClass("d-none");
  });
  const mobile_install_app = document.getElementById("mobile-install-app");
  if (mobile_install_app != null) {
    mobile_install_app.addEventListener("click", async () => {
      if (deferredPrompt !== null) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          deferredPrompt = null;
        }
      }
    });
  }
}

$(document).ready(function () {
  window.addEventListener("beforeinstallprompt", e => {
    $(".install-app-btn-container").show();
    $(".mobile_drop_down").animate(
      {
        bottom: "0px"
      },
      200
    );
    deferredPrompt = e;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Detect Safari
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isSafari) {
    document.querySelector("#install-app-div").classList.add("hide-on-safari");
  }
});

