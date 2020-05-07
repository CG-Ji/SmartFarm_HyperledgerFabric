#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error
set -e

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1
starttime=$(date +%s)
CC_SRC_LANGUAGE=${1:-"javascript"}
CC_SRC_LANGUAGE=`echo "$CC_SRC_LANGUAGE" | tr [:upper:] [:lower:]`
if [ "$CC_SRC_LANGUAGE" != "go" -a "$CC_SRC_LANGUAGE" != "golang" -a "$CC_SRC_LANGUAGE" != "java" \
 -a  "$CC_SRC_LANGUAGE" != "javascript"  -a "$CC_SRC_LANGUAGE" != "typescript" ] ; then

	echo The chaincode language ${CC_SRC_LANGUAGE} is not supported by this script
 	echo Supported chaincode languages are: go, java, javascript, and typescript
 	exit 1

fi

# clean out any old identites in the wallets
rm -rf javascript/wallet/*
rm -rf java/wallet/*
rm -rf typescript/wallet/*

# launch network; create channel and join peer to channel
pushd ../test-network
./networkSmartFarm.sh down
./networkSmartFarm.sh up createChannel -ca -s couchdb
./networkSmartFarm.sh deploySmartFarm -l ${CC_SRC_LANGUAGE}
popd

cat <<EOF

Total setup execution time : $(($(date +%s) - starttime)) secs ...

Next, use the SmartFarm applications to interact with the deployed SmartFarm contract.
The SmartFarm applications are available in multiple programming languages.
Follow the instructions for the programming language of your choice:
					
					SmartFarm By Nectec
                         .-.
                         '-'
                        //
               _..---._/|
             .' ."     '-.
            /__/          \      *
           ====_____     __|     :
          /#   #""" |   /()\    :    ..*
          |#   #    |   \__/    : .'' 
          \#___#____|      /   :::.. .
           \______________|_...ä_: .. '*
  ()       // /\||||)))))))      '   . .
 .( \_     \\_\//   _-'.'/        |   * ..
( )  |^|^|^|ooo/  _#\.//"""_      |   . . .
(_)_.'v|v|v|     / \#  \_ / '_  _'    . .  
           | _ _/_/     /'./_-|"         . .
           /#_#__"""-._ /#  \__)       .  .   
           |__   ""-._ |##               . . .
           |  ""|-"""-_/##              . .    
           /""--\__.-|                       .
           \-_.-<__ /                   .   .
           /-_| /  \
           \-_| \_-<.                        .  .
           <_-/ <_.-\                    .
           <_-|  |_.-|                        .
      .----|   \__\  |                 .
     |     ."""   '.  |                       .
      .___|        |__|  (c) NamelessOne
          '.__..."""

EOF
