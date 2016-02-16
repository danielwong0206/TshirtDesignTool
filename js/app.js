var TShirtDesignTool =
{
    init: function () {

        TShirtDesignTool.canvasInit();
        // All Event binding goes here
        $('#text-panel a').click(function (e) {
            TShirtDesignTool.drawText();
        });

        $('#textArea').keyup(function (e) {
            TShirtDesignTool.updateText(e.target.value);
        });

        $("#btnChooseShirt").click(function(e){
            TShirtDesignTool.chooseTShirtPanel();
        });
        $("#btnAddText").click(function(e){
            TShirtDesignTool.addTextPanel();
        });
        $("#btnAddclipart").click(function(e){
            TShirtDesignTool.changeToClipartPanel();
        });
        $("#btnUploadImage").click(function(e){
            TShirtDesignTool.changeToUploadImagePanel();
        });
        $("#btnPersonalize").click(function(e){
            TShirtDesignTool.showPersonalizationPanel();
        });
        $("#btnSaveDesign").click(function(e){
            TShirtDesignTool.showSaveDesignPanel();
        });

        $('#textSpacing,#fontSizing,#textCircular,#textOutline,#pathList,#upload-image,#import-design').change(function (e) {
            switch (e.target.id) {
                case 'textSpacing':
                    TShirtDesignTool.setTextSpacing(textSpacing.value);
                    break;
                case 'fontSizing':
                    TShirtDesignTool.setFontSize();
                    break;
                case 'textCircular':
                    TShirtDesignTool.setTextCircular();
                    break;
                case 'textOutline':
                    TShirtDesignTool.setOutline();
                    break;
                case 'pathList':
                    TShirtDesignTool.svgPathChange();
                    break;
                case 'upload-image':
                    TShirtDesignTool.uploadImage(e);
                    ;
                    break;
                case 'import-design':
                    TShirtDesignTool.importDesign(e);
                    break;
            }

        });

        $('#textArcSlider').slider({
            orientation: "horizontal",
            range: "min",
            min: -107,
            max: 108,
            value: 0,
            slide: TShirtDesignTool.setTextArc
        });

        $('#svgAngle').slider({
            orientation: "horizontal",
            range: "min",
            min: -1,
            max: 361,
            value: 0,
            slide: TShirtDesignTool.setSvgAngle
        });

        $('#svgOpacity').slider({
            orientation: "horizontal",
            range: "min",
            min: 0,
            max: 100,
            value: 100,
            slide: TShirtDesignTool.setSvgOpacity
        });

        $("#text-outline-slider").slider({
            orientation: "horizontal",
            range: "min",
            max: 100,
            value: 0,
            slide: TShirtDesignTool.setOutlineWidth
        });

        $("#text-color,#text-outline-color,#svgFill,#numberColor,#nameColor").spectrum({
            showPaletteOnly: true,
            togglePaletteOnly: true,
            hideAfterPaletteSelect: true,
            togglePaletteMoreText: 'more',
            togglePaletteLessText: 'less',
            color: 'gray',
            palette: [
                ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
                ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
                ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
                ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
                ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
                ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
                ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
                ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
            ]
        });

        $("#text-color,#text-outline-color,#svgFill,#nameColor,#numberColor").change(function (e) {
            var parentID = e.target.id,
                color = $('#' + parentID + '').spectrum("get").toHexString();
            switch (parentID) {
                case 'svgFill':
                    TShirtDesignTool.setSvgPathColor(color);
                    break;
                case 'text-color':
                    TShirtDesignTool.setTextColor(color);
                    break;
                case 'text-outline-color':
                    TShirtDesignTool.setOutlineColor(color);
                    break;
                case 'nameColor':
                    TShirtDesignTool.setPersonalizedNameColor(color);
                    break;
                case 'numberColor':
                    TShirtDesignTool.setPersonalizedNumberColor(color);
                    break;
            }
        });

        $('#font-style').ddslick({
            data: TShirtDesignTool.fontStyleData,
            width: 190,
            imagePosition: "left",
            selectText: "Select font style",
            onSelected: function (data) {
                //console.log(data);
                TShirtDesignTool.setFontStyle(data.selectedData.text);
            }
        });

        $('#font-family').ddslick({
            data: TShirtDesignTool.fontFamilyData,
            width: 300,
            selectText: "Select font family",
            onSelected: function (data) {
                //console.log(data)
                TShirtDesignTool.setTextFontFamily(data.selectedData.value);
            }
        });

        $('#clip-art-panel img').click(function (e) {
            TShirtDesignTool.addClipartToCanvas(e.target.src);
        });

        $('.ThumbImg').click(function (e) {
            TShirtDesignTool.changeTShirtSide(e.target.alt);
        });

        $('#btnSave').click(function () {
            TShirtDesignTool.saveDesign();
        });

        $('#btnCancel').click(function () {
            $('#save-design-popup').foundation('reveal', 'close');
        });

        $('#changeShirtBtn').click(function (e) {
            TShirtDesignTool.showTShirtCollection();
        });

        $('#chooseTShirtPanel fieldset a').each(function () {
            if( !$(this).hasClass("disable_a_href")){
                $(this).click(function (e) {
                    TShirtDesignTool.changeTShirtColor(e.target.title);
                })
            }
        });

        $('#addName,#addNumber,#nameInch,#numberInch').change(function (e) {
            switch (e.currentTarget.id) {
                case 'addName':
                    addName.checked ? TShirtDesignTool.addPersonalizedName()
                        : TShirtDesignTool.removePersonalizedName();
                    break;
                case 'addNumber':
                    addNumber.checked ? TShirtDesignTool.addPersonalizedNumber()
                        : TShirtDesignTool.removePersonalizedNumber();
                    break;
                case 'nameInch':
                    TShirtDesignTool.setPersonalNameSize(parseFloat(nameInch.value));
                    break;
                case 'numberInch':
                    TShirtDesignTool.setPersonalNumberSize(parseFloat(numberInch.value));
                    break;
            }

        });

        $("#nameSide,#numberSide").change(function (e) {
            TShirtDesignTool.changeTshirtSideInPersonalizationMode(e.currentTarget.value);
        });

        $('#insertRow').click(function (e) {
            var row = $('#personalizeDataTable tbody tr').last().clone();
            $(row.children()).each(function (item) {
                switch (item) {
                    case 0:
                        this.innerHTML = parseInt(this.innerHTML) + 1;
                        break;
                    case 1:
                        $(this).children().val('');
                        break;
                    case 2:
                        $(this).children().val('');
                        break;
                }
            });
            $('#personalizeDataTable tbody').append(row);
        });

        $('#saveData').click(function (e) {

            var zip = new JSZip(),
                template = [];
            ['designFront', 'designBack'].forEach(function (sideName, i) {

                window.canvas.clear();
                var imageSrc = '/TshirtDesignTool/img/' + TShirtDesignTool.selectedTShirt.color + '-1-' + sideName[6] + '.jpg';
                window.canvas.backgroundImage._element.src = imageSrc;

                if (sideName[6] === nameSide.value) {
                    $(TShirtDesignTool.personalizeObjects).each(function () {
                        if (this.id === 'customName') {
                            window.canvas.add(this);
                        }
                    });
                }

                if (sideName[6] === numberSide.value) {
                    $(TShirtDesignTool.personalizeObjects).each(function () {
                        if (this.id === 'customNumber') {
                            window.canvas.add(this);
                        }
                    });
                }

                window.canvas.renderAll();
                zip.file(sideName + '.txt', JSON.stringify(window.canvas.toJSON()));
                zip.file(sideName + '.png', window.canvas.toDataURL("image/png").replace('data:image/png;base64,', ''), {base64: true});

            });

            var memberList = [];

            $('#personalizeDataTable tbody tr').each(function () {
                var member = {};
                $($(this).children()).each(function (td) {
                    switch (td) {
                        case 0:
                            member.serialNo = this.innerHTML;
                            break;
                        case 1:
                            member.name = $(this).children().val();
                            break;
                        case 2:
                            member.number = $(this).children().val();
                            break;
                        case 3:
                            member.size = $(this).children().val();
                            break;
                    }
                });
                memberList.push(member);
            });

            var csv = convertArrayOfObjectsToCSV({
                data: memberList
            });

            zip.file("member.txt", JSON.stringify(memberList));
            zip.file("memberlist.csv", csv);


            $('#saveData').attr({
                'download': 'design-data',
                'href': "data:application/zip;base64," + zip.generate()
            });

            $('#personalization-popup').foundation('reveal', 'close');
        });

        $("#undoBtn").click(function(e){
            TShirtDesignTool.undo();
        });

        $("#redoBtn").click(function(e){
            TShirtDesignTool.redo();
        });

}
    , canvasInit: function () {
        window.canvas = new fabric.Canvas('canvas');
        canvas.setHeight($('#canvas-container').height());
        canvas.setWidth($('#canvas-container').width());
        var img = new Image();
        img.src = '/TshirtDesignTool/img/' + TShirtDesignTool.selectedTShirt.color + '-1-' + TShirtDesignTool.selectedTShirt.side + '.jpg';
        img.onload = function () {
            canvas.setBackgroundImage(img.src, canvas.renderAll.bind(canvas), {
                originX: 'left',
                originY: 'top',
                left: 0,
                top: 0,
                id: 'F',
                width: canvas.getWidth(),
                height: canvas.getHeight()
            });
        };

        canvas.on('object:added', function (e) {
            var obj = e.target;

            if (obj.id === 'customName' || obj.id === 'customNumber') {
                obj.on('selected', function () {
                    TShirtDesignTool.showPersonalizationPanel();
                });
                return;
            }
            if (TShirtDesignTool.isUndoMode) {
                TShirtDesignTool.undoObjects.push({
                    operation: 'added',
                    object: obj
                });
            }
            if (!TShirtDesignTool.isUndoMode) {
                TShirtDesignTool.redoObjects.push({
                    operation: 'added',
                    object: obj
                });
            }
            if (obj.type === 'text' || obj.type === 'curvedText') {
                obj.on('selected', function () {
                    TShirtDesignTool.textEditorPanel();
                });
            }
            if (obj.type === 'path-group') {
                obj.on('selected', function () {
                    $('#pathList').html('');
                    for (var i = 0; i < obj.paths.length; i++) {
                        var option = '<option value=' + i + ' >Path ' + i + '</option>';
                        $('#pathList').append(option);
                    }
                    TShirtDesignTool.clipartEditorPanel();
                });
            }
        });

        canvas.on('object:removed', function (e) {
            var obj = e.target;
            if (TShirtDesignTool.isUndoMode) {
                TShirtDesignTool.undoObjects.push({
                    operation: 'deleted',
                    object: obj
                });
            }
            if (!TShirtDesignTool.isUndoMode) {
                TShirtDesignTool.redoObjects.push({
                    operation: 'deleted',
                    object: obj
                });
            }
        });

        canvas.on('mouse:down', function(e){

            if(e.target=== undefined){

                if(TShirtDesignTool.lastSelectedObject && TShirtDesignTool.lastSelectedObject.type==='text'){
                    TShirtDesignTool.showPanel('text-panel');
                    $('#text-panel textarea').val('');
                }

                if(TShirtDesignTool.lastSelectedObject && TShirtDesignTool.lastSelectedObject.type==='path-group'){
                    TShirtDesignTool.showPanel('clip-art-panel');
                }

            }
        });

        canvas.on('object:selected', function (e) {
            TShirtDesignTool.lastSelectedObject= e.target;
        });

        document.onkeydown = function (e) {
            if (46 === e.keyCode || e.keyCode === 110) {
                var activeObject = window.canvas.getActiveObject();
                if (activeObject !== null) {
                    window.canvas.remove(activeObject);
                }
                window.canvas.renderAll();
                TShirtDesignTool.addTextPanel();
            }
        }
}
    , enableObjectBoundingonCanvas: function () {
        window.canvas.on('object:moving', function (e) {
            var obj = e.target;
            // if object is too big ignore
            if (obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width) {
                return;
            }
            obj.setCoords();
            // top-left  corner
            if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
                obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
                obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
            }
            // bot-right corner
            if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
                obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top);
                obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left);
            }
        });

}
    , undo: function () {
        TShirtDesignTool.isUndoMode = false;
        if (TShirtDesignTool.undoObjects.length > 0) {
            var object = TShirtDesignTool.undoObjects.pop();
            if (object) {
                if (object.operation === 'added') {
                    window.canvas.remove(object.object);
                    if(object.object.type==='text'){
                        TShirtDesignTool.showPanel('text-panel');
                        $('#text-panel textarea').val('');
                    }
                    if(object.object.type==='path-group'){
                        TShirtDesignTool.showPanel('clip-art-panel');
                    }
                }
                if (object.operation === 'deleted') {
                    window.canvas.add(object.object);
                }
            }
        }
        TShirtDesignTool.isUndoMode = true;
}
    , redo: function () {

        TShirtDesignTool.isUndoMode = true;
        if (TShirtDesignTool.redoObjects.length > 0) {
            var object = TShirtDesignTool.redoObjects.pop();
            if (object) {
                if (object.operation === 'added') {
                    window.canvas.remove(object.object);
                }
                if (object.operation === 'deleted') {
                    window.canvas.add(object.object);
                }
            }
        }
    //TShirtDesignTool.isUndoMode=true;
}
    , showPanel: function (panelToshow) {
    TShirtDesignTool.panels.forEach(function (panel) {
        panel === panelToshow ? $('#' + panel).fadeIn(500) : $('#' + panel).hide();
    });
}
    , getCanvasActiveObject: function () {
    return window.canvas.getActiveObject() || window.canvas.item(0);
    //throw new Error('This is not an error. This is just to abort javascript');
}
    , defaultEditorPanel: function (Text) {
    TShirtDesignTool.showPanel('editor-panel');
    textArea.value = Text;
    $('#font-family .dd-selected').get(0).innerHTML = 'Select font family';
    $('#font-style .dd-selected').get(0).innerHTML = 'Select font style';
    textSpacing.value = 0;
    fontSizing.value = 30;
    if (textOutline.checked)
        textOutline.checked = false;
    if (textCircular.checked)
        textCircular.checked = false;
    $('#textArcSlider').slider({disabled: false});
    $('#textArcSlider').slider('value', 0);
    $('#text-color').spectrum("set", '#000');
    $("#outline-properties").hide();
}
    , chooseTShirtPanel: function () {
    TShirtDesignTool.showPanel('chooseTShirtPanel');
    TShirtDesignTool.isPersonalizationMode = false;
}
    , showTShirtCollection: function () {

}
    , textEditorPanel: function () {
    var selectedObject = window.canvas.getActiveObject();
    if (!selectedObject)
        return;
    TShirtDesignTool.showPanel('editor-panel');
    textArea.value = selectedObject.text;
    $('#font-family .dd-option-value').each(function () {
        if ($(this).val() == selectedObject.fontFamily) {
            $($('a.dd-selected')[0]).text(selectedObject.fontFamily)
        }
    });
    if (selectedObject.letterSpacing !== undefined)
        textSpacing.value = selectedObject.letterSpacing;
    if (selectedObject.spacing !== undefined)
        textSpacing.value = (selectedObject.spacing );
    fontSizing.value = selectedObject.fontSize;

    $('#text-color').spectrum("set", selectedObject.fill);

    $('#font-style .dd-option-text').each(function () {
        if ((this.innerHTML == selectedObject.fontStyle) || ( this.innerHTML == selectedObject.fontWeight ) || ( this.innerHTML == selectedObject.textDecoration)) {
            if ($(this).closest('a').children().length === 3) {
                $(this).closest('a').find('input').after('<img class="dd-option-image" src="img/check-mark.png">');
                //console.log($(this).closest('a').get(0).innerHTML);
            }
        }
        else {
            if ($(this).closest('a').children().length === 4) {
                $(this).closest('a').find('img').remove();
                //console.log($(this).closest('a').get(0).innerHTML);
            }
        }

    });
    if (selectedObject.effect == 'circular') {
        if (!textCircular.checked)
            textCircular.checked = true;
        $('#textArcSlider').slider({disabled: true});
    }
    if (selectedObject.effect == 'arc') {
        if (selectedObject.spacing !== undefined)
            textSpacing.value = (selectedObject.spacing + 9);
        if (textCircular.checked)
            textCircular.checked = false;
        $('#textArcSlider').slider({disabled: false});
        //console.log(selectedObject.reverse)
        var multiplier = selectedObject.reverse ? 1 : -1;
        var sliderValue = 150 - ((100 * selectedObject.radius) / TShirtDesignTool.arcTextWidth);
        //console.log(sliderValue)
        $('#textArcSlider').slider('value', multiplier * sliderValue);
    }
    if (selectedObject.type === 'text') {
        if (textCircular.checked)
            textCircular.checked = false;
        $('#textArcSlider').slider({disabled: false});
        $('#textArcSlider').slider('value', 0);
    }

    if (selectedObject.stroke) {
        textOutline.checked = true;
        //console.log(selectedObject.stroke)
        //console.log(selectedObject.strokeWidth)
        if ($("#outline-properties").get(0).style['display'] === 'none')
            $("#outline-properties").fadeIn(100);
        $('#text-outline-color').spectrum("set", selectedObject.stroke);
        $('#text-outline-slider .ui-slider-range').css('background', selectedObject.stroke);
        $('#text-outline-slider').slider('value', selectedObject.strokeWidth * 100);
    }
    else {
        textOutline.checked = false;
        $("#outline-properties").hide();
    }

    //if(selectedObject.strokeWidth)
    //     $('#text-outline-slider').slider('value', selectedObject.strokeWidth*100);

}
    , addTextPanel: function () {
    TShirtDesignTool.showPanel('text-panel');
    $('#text-panel textarea').val('');
    TShirtDesignTool.isPersonalizationMode = false;
}
    , changeToClipartPanel: function () {
    TShirtDesignTool.showPanel('clip-art-panel');
    TShirtDesignTool.isPersonalizationMode = false;
}
    , clipartEditorPanel: function () {

        TShirtDesignTool.showPanel('edit-clipart-panel');
        var activeObject = window.canvas.getActiveObject();
        //console.log(activeObject.paths[pathList.options.selectedIndex].fill)
        $('#svgFill').spectrum("set", activeObject.paths[pathList.options.selectedIndex].fill);
        //$('.k-selected-color').get(2).style['background-color'] = activeObject.paths[pathList.options.selectedIndex];
        if (activeObject.angle) {
            $('#svgAngle').slider('value', activeObject.angle);
        }
        if (activeObject.opacity)
            $('#svgOpacity').slider('value', activeObject.opacity * 100);
}
    , changeToUploadImagePanel: function () {
    TShirtDesignTool.showPanel('upload-image-panel');
}
    , changeTshirtSideInPersonalizationMode: function (sideName) {
    //alert(sideName)
    window.canvas.clear();
    var imageSrc = '/TshirtDesignTool/img/' + TShirtDesignTool.selectedTShirt.color + '-1-' + sideName + '.jpg';
    var img = new Image();
    img.src = imageSrc;
    img.alt = sideName;
    img.onload = function () {
        window.canvas.setBackgroundImage(img.src, window.canvas.renderAll.bind(canvas), {
            originX: 'left',
            originY: 'top',
            left: 0,
            top: 0,
            width: canvas.getWidth(),
            height: canvas.getHeight()
        });
    };

    if (sideName === nameSide.value) {
        $(TShirtDesignTool.personalizeObjects).each(function () {
            if (this.id === 'customName') {
                window.canvas.add(this).renderAll();
            }
        });
    }

    if (sideName === numberSide.value) {
        $(TShirtDesignTool.personalizeObjects).each(function () {
            if (this.id === 'customNumber') {
                window.canvas.add(this).renderAll();
            }
        });
    }

}
    , showPersonalizationPanel: function () {
    TShirtDesignTool.showPanel('personalization-panel');
    TShirtDesignTool.isPersonalizationMode = true;
}
    , showPersonalizationPopup: function () {
    $('#personalizeDataTable tbody').html('');
    var row = '<tr>' +
        '<td>1</td>' +
        '<td><input type="text" disabled placeholder="Enter Name"></td>' +
        '<td><input type="text" disabled placeholder="Enter #"></td>' +
        '<td>' +
        '<select>' +
        '<option selected disabled>select product size</option>' +
        '<option>S(small) White Glidan cotton </option>' +
        '<option>M(medium) White Glidan cotton </option>' +
        '<option>L(large) White Glidan cotton </option>' +
        '<option>XL(extra-large) White Glidan cotton </option>' +
        '<option>2XL(double-extra-large) White Glidan cotton </option>' +
        '</select>' +
        '</td>' +
        '</tr>';
    $('#personalizeDataTable tbody').append(row);
    $('#personalizeDataTable tbody tr:nth-child(1) td:nth-child(2) input').prop('disabled', !addName.checked);
    $('#personalizeDataTable tbody tr:nth-child(1) td:nth-child(3) input').prop('disabled', !addNumber.checked);

}
    , addPersonalizedName: function () {
    var personalizeName = new fabric.Text('SAMPLE', {
        left: canvas.getWidth() / 2 - 30,
        top: canvas.getHeight() / 2 - 30,
        fontFamily: 'impact',
        fontSize: 32,
        id: 'customName'
    });
    window.canvas.add(personalizeName).renderAll();
    TShirtDesignTool.personalizeObjects.push(personalizeName);
}
    , removePersonalizedName: function () {
    if (window.canvas.getObjects()) {
        $(window.canvas.getObjects()).each(function () {
            if (this.id === 'customName') {
                window.canvas.remove(this);
            }
        });
    }
    $(TShirtDesignTool.personalizeObjects).each(function (item) {
        if (this.id === 'customName') {
            TShirtDesignTool.personalizeObjects.splice(item, 1);
        }
    })
}
    , addPersonalizedNumber: function () {
    var personalizeNumber = new fabric.Text('00', {
        left: canvas.getWidth() / 2 - 30,
        top: canvas.getHeight() / 2 - 30,
        fontFamily: 'impact',
        fontSize: 32,
        //width:40,
        //height:40,
        id: 'customNumber'
    });
    personalizeNumber.setScaleX(1.5);
    personalizeNumber.setScaleY(1.5);
    window.canvas.add(personalizeNumber).renderAll();
    TShirtDesignTool.personalizeObjects.push(personalizeNumber);
}
    , removePersonalizedNumber: function () {
    if (window.canvas.getObjects()) {
        $(window.canvas.getObjects()).each(function () {
            if (this.id === 'customNumber') {
                window.canvas.remove(this);
            }
        });
    }
    $(TShirtDesignTool.personalizeObjects).each(function (item) {
        if (this.id === 'customNumber') {
            TShirtDesignTool.personalizeObjects.splice(item, 1);
        }
    })
}
    , setPersonalizedNameColor: function (color) {
    if (window.canvas.getObjects()) {
        $(window.canvas.getObjects()).each(function () {
            if (this.id === 'customName') {
                this.setFill(color);
            }
        });
    }
    window.canvas.renderAll();
}
    , setPersonalizedNumberColor: function (color) {
    if (window.canvas.getObjects()) {
        $(window.canvas.getObjects()).each(function () {
            if (this.id === 'customNumber') {
                this.setFill(color);
            }
        });
    }
    window.canvas.renderAll();
}
    , setPersonalNameSize: function (inches) {
    if (window.canvas.getObjects()) {
        $(window.canvas.getObjects()).each(function () {
            if (this.id === 'customName') {
                this.setScaleX(inches);
                this.setScaleY(inches);
            }
        });
    }
    window.canvas.renderAll();
}
    , setPersonalNumberSize: function (inches) {
    if (window.canvas.getObjects()) {
        $(window.canvas.getObjects()).each(function () {
            if (this.id === 'customNumber') {
                this.set('scaleX', inches);
                this.set('scaleY', inches);
            }
        });
    }
    window.canvas.renderAll();
}
};


$(document).ready(function () {
    TShirtDesignTool.init();
    $(document).foundation();
});

TShirtDesignTool.prototype ={
    test: function(){
        return "hey ! working.";
    }
};

TShirtDesignTool.panels=[
    'text-panel',
    'editor-panel',
    'clip-art-panel',
    'upload-image-panel',
    'edit-clipart-panel',
    'chooseTShirtPanel',
    'personalization-panel'
];
TShirtDesignTool.tempDesignData=[
    {
        side: 'F',
        object: null
    },
    {
        side: 'B',
        object: null
    },
    {
        side: 'L',
        object: null
    },
    {
        side: 'R',
        object: null
    }
];
TShirtDesignTool.undoObjects= [];
TShirtDesignTool.redoObjects= [];
TShirtDesignTool.isUndoMode= true;
TShirtDesignTool.arcTextWidth= 0;
TShirtDesignTool.isPersonalizationMode=false;
TShirtDesignTool.personalizeJsonData= {
    frontTemplate: null,
        backTemplate: null,
        memberList: []
};
TShirtDesignTool.personalizeObjects= [];
TShirtDesignTool.lastSelectedObject=null;