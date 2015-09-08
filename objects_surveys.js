

function INIT_OBJECTS_SURVEYS_TAB()
{
    /* Init date fields */
    //document.getElementById("start_objects_date_field").innerHTML = getCurrentYear()+"-01-01";
    //document.getElementById("stop_objects_date_field").innerHTML = today();


    metaobj_objects_surveys = new smisMeta({  "NoFlash":1, "debug": 1, "debug_func" : function(msg){	tlog(msg); }, conf: MetaDATA_conf.objects_surveys, loadingHTML: "&nbsp;&nbsp;&nbsp;���������� ...<br><br>",nodataHTML: "&nbsp;&nbsp;&nbsp;��� ������<br><br>" });
    metaobj_objects_surveys.renderMakeParams = objects_surveys_makeMetaParams;
    metaobj_objects_surveys.OnMetaUpdate = objects_surveys_OnMetaUpdate;
    metaobj_objects_surveys.OnMetaClick = objects_surveys_OnMetaClick;

    metaobj_surveys = new smisMeta({  "NoFlash":1, "debug": 1, "debug_func" : function(msg){	tlog(msg); }, conf: MetaDATA_conf.surveys, loadingHTML: "&nbsp;&nbsp;&nbsp;���������� ...<br><br>",nodataHTML: "&nbsp;&nbsp;&nbsp;��� ������<br><br>" });
    metaobj_surveys.renderMakeParams = surveys_makeMetaParams;
    metaobj_surveys.OnMetaUpdate = surveys_OnMetaUpdate;
    metaobj_surveys.OnMetaClick = surveys_OnMetaClick;
    
    reload_objects_surveys_parameters();
}

function set_objects_date_field()
{
}

function reload_objects_surveys_parameters()
{

	if(active_tab=="tab_objects_surveys")
	{
		metaobj_objects_surveys.get();
	}	  
    
}

function reload_surveys_parameters()
{
    var UID = 0;
    
	var selected = metaobj_objects_surveys.GetSelectedMetaInfo();
    
    if(selected[0])
    {
        UID = selected[0]['uid'];
    }

	var params = { data_params:  {	objects_surveys_object_id: UID	} };

	metaobj_surveys.SetDataParams(params);
	
	metaobj_surveys.get();
    
    document.getElementById("_metadata_surveys_portion_info").innerHTML = "&nbsp;";
}


function tab_objects_surveys_onactive()
{
	reload_objects_surveys_parameters();
}	



function objects_surveys_makeMetaParams(opts)
{  
	var params={};
	
	if(opts.DATA.obj_name) { params.name = opts.DATA.obj_name; }

    if(opts.DATA.obj_condition_id) 
	{ 
	    var cond_types = opts.INFO.info_type.obj_condition_id;
	    
	    var cond = opts.DATA.obj_condition_id;
	    
        /*if( cond_types[cond] !== undefined )
        {
            alert(cond);
            //params.condition = cond_types[cond].rus_name;
            alert(cond_types[cond].rus_name);
        }
        else
        {
            params.condition =  cond;
        } */
        
        params.condition =  cond;
    }   
    
	return params;
}

function objects_surveys_OnMetaUpdate(opts)
{ 
	if(opts && opts.metadataid)
	{
		var obj = document.getElementById("_metadata_objects_portion_info");

		if(defined(opts.INFO.query.count) && opts.INFO.query.count!==null)
		{       
				if(project_language == 'rus')
				{
					obj.innerHTML = "��������: "+opts.INFO.query.count;
				}	
				if(project_language == 'eng')
				{
					obj.innerHTML = "Objects: "+opts.INFO.query.count;
				}	
		}
		else
		{
			obj.innerHTML = "&nbsp;";
		}
	}
}

function objects_surveys_OnMetaClick()
{ 
		reload_surveys_parameters();
		setObjectsLayers();
}




function surveys_makeMetaParams(opts)
{  
	var params={};
	
	if(opts.DATA.id) { params.id = opts.DATA.id; }

	if(opts.DATA.sur_dt) { params.dt = opts.DATA.sur_dt; }
    
	return params;
    
}

function surveys_OnMetaUpdate(opts)
{
	var obj = document.getElementById("_metadata_surveys_portion_info");
	
	if(opts && opts.metadataid)
	{
		

		if(defined(opts.INFO.query.count) && opts.INFO.query.count!==null)
		{       
				if(project_language == 'rus')
				{
					obj.innerHTML = "����������: "+opts.INFO.query.count;
				}	
				if(project_language == 'eng')
				{
					obj.innerHTML = "Surveys: "+opts.INFO.query.count;
				}	
		}
		else
		{
			obj.innerHTML = "&nbsp;";
		}
	}
	
	var selected = metaobj_objects_surveys.GetSelectedMetaInfo();
    
    if(!selected[0])
    {
       obj.innerHTML = "&nbsp;";
    }
	
    
}

function surveys_OnMetaClick()
{
    setSurveysLayers();
}

function clearObjectsSelection()
{
    metaobj_objects_surveys.ClearSelection();
    
    reload_surveys_parameters(); // ������� ������ ������, ��� ��� ������ UID = 0
}

function clearSurveysSelection()
{
    metaobj_surveys.ClearSelection();
}

function setObjectsLayers()
{ 
    var selected = metaobj_objects_surveys.GetSelectedMetaInfo();
    if(selected[0])
    {
    	var UID = selected[0]['uid'];
    	
    	if(layers["objects_surveys"].params)
    	{
    	    layers["objects_surveys"].params["objects_surveys_selected_id"] = UID;
    	}
    	
    	mapobj.LayerShow('objects_surveys');
    }
    else
    {
    	mapobj.LayerHide('objects_surveys');
    }		
}	

function setSurveysLayers()
{ 
    var selected = metaobj_surveys.GetSelectedMetaInfo();
    if(selected[0])
    {
    	var UID = selected[0]['uid'];
    	
    	if(layers["surveys"].params)
    	{
    	    layers["surveys"].params["objects_surveys_selected_id"] = UID;
    	}
    	
    	mapobj.LayerShow('surveys');
    }
    else
    {
    	mapobj.LayerHide('surveys');
    }		
}	

function deleteObjectContour()
{
    alert("STUB (delete)");
}

function updateObjectsList()
{
		clearObjectsSelection();

	    var params = { data_params:  {	nocache: randomString(5)	} };
	    metaobj_objects_surveys.SetDataParams(params);
		metaobj_objects_surveys.get();
}

var tmpOldURL = poly2dbUrl;
function tmpAddPolyMode()
{
    if(document.getElementById("objectsSurveysAddControl").checked)
    {
        poly2dbUrl = "/geosmis_projects/ffm/poly2db/cgi/poly2db_form.pl";
    }
    else
    {
        poly2dbUrl = tmpOldURL;
    }
        
}

function addObjectToList()
{
    var addObjectURL = "/geosmis_projects/ffm/poly2db/templates/object2db_add.html";
    var wnd = window.open(addObjectURL,"_obj_new","width=600,height=400,left=100,top=100,location=no,toolbar=no,scrollbars=no,resizable=yes" );	
}
